/**
 监控TestFlight空位（无需MITM）
 检测到空位后发送带直达链接的通知，点击即打开TestFlight链接。

 使用说明（Loon/Surge 通用脚本环境）：
 - 在插件参数或持久化数据中配置 APP_ID 列表（逗号分隔）。
   • 参数：APP_ID=xxxx,yyyy,zzzz
   • 持久化键：fmz200_TF_APP_ID（同样逗号分隔）
 - 建议以定时任务方式运行，避免频繁触发。
*/

const $ = new Env('监控TestFlight空位');

;(async function () {
  try { await main(); } catch (err) { $.warn('运行异常: ' + String(err)); }
  $.done();
})();

async function main() {
  const ids = getTargetIds();
  if (!ids || ids.length === 0) {
    $.msg($.name, '未配置APP_ID', '请在插件参数或持久化数据中填写 join 代码', { 'open-url': 'https://testflight.apple.com/' });
    return;
  }

  const tasks = ids.map(id => checkJoinPage(id)
    .then(res => ({ id, ok: true, available: res }))
    .catch(e => ({ id, ok: false, reason: String(e) }))
  );
  const results = await Promise.all(tasks);

  for (const r of results) {
    if (!r.ok) {
      $.warn('检测失败: ' + r.id + ' => ' + r.reason);
      continue;
    }
    const prev = $.getdata(statusKey(r.id)) || '';
    if (r.available && prev !== 'available') {
      $.setdata('available', statusKey(r.id));
      $.setdata(beijingNow(), statusTimeKey(r.id));
      $.msg('TestFlight空位监控', '检测到可加入: ' + r.id, '点击打开并加入测试', { 'open-url': joinUrl(r.id) });
    } else if (!r.available && prev !== 'full') {
      $.setdata('full', statusKey(r.id));
      $.setdata(beijingNow(), statusTimeKey(r.id));
      $.info('当前满员: ' + r.id);
    }
  }
}

function getTargetIds() {
  const ids = [];
  try {
    if (typeof $argument === 'string' && $argument) {
      const map = parseArgument($argument);
      if (map.APP_ID) ids.push.apply(ids, map.APP_ID.split(',').map(function (s) { return s.trim(); }).filter(Boolean));
    }
  } catch (e) {}

  try {
    const raw = $.getdata('fmz200_TF_APP_ID') || '';
    if (raw) {
      let val = raw;
      try { val = JSON.parse(raw); } catch (e) {}
      const str = typeof val === 'string' ? val : String(val);
      ids.push.apply(ids, str.split(',').map(function (s) { return s.trim(); }).filter(Boolean));
    }
  } catch (e) {}

  // 去重
  const set = Object.create(null);
  const out = [];
  for (let i = 0; i < ids.length; i++) {
    const v = ids[i];
    if (!set[v]) { set[v] = 1; out.push(v); }
  }
  return out;
}

function parseArgument(arg) {
  const out = {};
  String(arg).split('&').forEach(function (kv) {
    const i = kv.indexOf('=');
    const k = i >= 0 ? kv.slice(0, i) : kv;
    const v = i >= 0 ? kv.slice(i + 1) : '';
    if (k) out[k] = decodeURIComponent(v || '');
  });
  return out;
}

function statusKey(id) { return 'fmz200_TF_status_' + id; }
function statusTimeKey(id) { return 'fmz200_TF_status_time_' + id; }
function joinUrl(id) { return 'https://testflight.apple.com/join/' + id; }

function checkJoinPage(id) {
  const url = joinUrl(id);
  const headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cache-Control': 'no-cache'
  };
  return new Promise(function (resolve, reject) {
    $.get({ url: url, headers: headers }, function (err, resp, body) {
      if (err) return reject(err);
      try {
        const html = String(body || '');
        resolve(isAvailable(html));
      } catch (e) {
        reject(e);
      }
    });
  });
}

function isAvailable(html) {
  const h = String(html || '').toLowerCase();
  // 常见“满员”语句
  const fullPatterns = [
    'beta is full',
    'this beta is full',
    'currently full',
    '名额已满',
    '已满员',
    '暂无名额'
  ];
  // 常见“可加入/开始测试”语句
  const availPatterns = [
    'join the beta',
    'start testing',
    'accept',
    '安装',
    '开始测试',
    '加入 beta',
    '加入测试'
  ];
  for (let i = 0; i < fullPatterns.length; i++) if (h.indexOf(fullPatterns[i]) >= 0) return false;
  for (let j = 0; j < availPatterns.length; j++) if (h.indexOf(availPatterns[j]) >= 0) return true;
  // 兜底：含 join 且不含 full
  return h.indexOf('join') >= 0 && h.indexOf('full') < 0;
}

function beijingNow() {
  const date = new Date();
  const utc = date.getTime();
  const t = new Date(utc + 8 * 60 * 60 * 1000);
  const Y = t.getUTCFullYear();
  const M = String(t.getUTCMonth() + 1).padStart(2, '0');
  const D = String(t.getUTCDate()).padStart(2, '0');
  const h = String(t.getUTCHours()).padStart(2, '0');
  const m = String(t.getUTCMinutes()).padStart(2, '0');
  const s = String(t.getUTCSeconds()).padStart(2, '0');
  return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
}

// 极简兼容 Env（Loon / Surge / QuanX）
function Env(name) {
  this.name = name || 'Env';
  this.getdata = function (key) {
    try {
      if (typeof $persistentStore !== 'undefined') return $persistentStore.read(key);
      if (typeof $prefs !== 'undefined') return $prefs.valueForKey(key);
      return null;
    } catch (e) { return null; }
  };
  this.setdata = function (val, key) {
    try {
      if (typeof $persistentStore !== 'undefined') return $persistentStore.write(String(val), key);
      if (typeof $prefs !== 'undefined') return $prefs.setValueForKey(String(val), key);
      return false;
    } catch (e) { return false; }
  };
  this.get = function (opts, cb) {
    if (typeof $httpClient !== 'undefined') {
      return $httpClient.get(opts, function (err, resp, body) { if (cb) cb(err, resp, body); });
    }
    if (typeof $task !== 'undefined') {
      var req = typeof opts === 'string' ? { url: opts } : opts;
      return $task.fetch(req).then(function (u) {
        cb && cb(null, { status: u.statusCode, headers: u.headers, body: u.body }, u.body);
      }, function (e) { cb && cb(e, null, null); });
    }
  };
  this.post = function (opts, cb) {
    if (typeof $httpClient !== 'undefined') {
      return $httpClient.post(opts, function (err, resp, body) { if (cb) cb(err, resp, body); });
    }
    if (typeof $task !== 'undefined') {
      var req = typeof opts === 'string' ? { url: opts } : opts;
      req.method = 'POST';
      return $task.fetch(req).then(function (u) {
        cb && cb(null, { status: u.statusCode, headers: u.headers, body: u.body }, u.body);
      }, function (e) { cb && cb(e, null, null); });
    }
  };
  this.msg = function (title, subtitle, message, option) {
    var opts = (function (op) {
      if (!op) return undefined;
      if (typeof op === 'string') return { 'open-url': op, url: op };
      if (typeof op === 'object') {
        var o = {};
        var open = op['open-url'] || op.openUrl || op.url;
        if (open) o['open-url'] = open;
        if (op['media-url']) o['media-url'] = op['media-url'];
        if (op['update-pasteboard']) o['update-pasteboard'] = op['update-pasteboard'];
        return o;
      }
      return undefined;
    })(option);
    if (typeof $notify !== 'undefined') return $notify(title, subtitle, message, opts);
    if (typeof $notification !== 'undefined') return $notification.post(title, subtitle, message, opts);
    try { console.log('[MSG]', title, subtitle, message, opts || ''); } catch (e) {}
  };
  this.info = function () { try { console.log.apply(console, ['[INFO]'].concat([].slice.call(arguments))); } catch (e) {} };
  this.warn = function () { try { console.log.apply(console, ['[WARN]'].concat([].slice.call(arguments))); } catch (e) {} };
  this.done = function (val) { if (typeof $done !== 'undefined') $done(val || {}); };
}
