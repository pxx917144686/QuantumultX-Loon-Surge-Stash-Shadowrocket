/*
SubPlayer 解锁Pro/永久钻石会员 @ pxx917144686
【严格模仿 mojitianqi.js：原响应基础上极简赋值，每句就是字段=值，不搞整体替换】
【字段类型 100% 对齐 HAR：has_membership 是 bool（埋点实锤），vip_type 是 int，is_diamond 是 bool（list_group实锤）】
【字段名 100% 对齐 HAR+strings：product_id/app_store_product_id/microsoft_store_product_id/is_continuous 全部是 HAR 已实锤的写法】

[rewrite_local]
^https?:\/\/meivipapi\.icewx\.com\/usermix\/user_info url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/infoc\/events url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/paypackagebase\/list_group url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js

[mitm]
hostname = meivipapi.icewx.com
*/

const FAR_MS = 4092599349000;

if (typeof $response != 'undefined' && $response.body && $request.url.indexOf('/usermix/user_info') != -1) {
  // ==== 严格学 mojitianqi.js：原响应基础上一句句赋值，不整体替换！====
  let pxx = JSON.parse($response.body);
  if (!pxx.data) pxx.data = {};

  // ---- 第一层：data 顶层直接塞 has_* / is_* / vip_type（模仿mojitianqi顶层赋值式）----
  pxx.data.has_membership = true;
  pxx.data.has_lifetime_membership = true;
  pxx.data.already_has_lifetime_membership = true;
  pxx.data.is_diamond = true;
  pxx.data.vip_type = 3;
  pxx.data.expires_at_ms = FAR_MS;

  // ---- 第二层：vip_info_list 每条记录字段名 100% 来自 HAR list_group + strings 实锤 ----
  pxx.data.vip_info_list = [
    {
      product_id: '1000003',
      app_store_product_id: 'com.meijietech.subplayer.lifetime',
      microsoft_store_product_id: '9PPSLR8BM021',
      vip_type: 3,
      is_diamond: true,
      is_continuous: false,
      has_membership: true,
      has_lifetime_membership: true,
      expires_at_ms: FAR_MS,
      created_at_ms: 1666666666000,
      order_id: 'SPLIFETIME6666666666666666'
    }
  ];

  // ---- 第三层：permission_list permission_type 来自 strings 实锤 ----
  pxx.data.permission_list = [
    { permission_type: 'subtitle_ai_generate' },
    { permission_type: 'subtitle_translate' },
    { permission_type: 'no_ad' }
  ];

  $done({ body: JSON.stringify(pxx) });
}
else if (typeof $response != 'undefined' && $response.body && $request.url.indexOf('/paypackagebase/list_group') != -1) {
  // ==== HAR实锤：list_group真实只有pay_groups+server_timestamp_ms，不要瞎加字段 ====
  // ==== 顶多保险起见在data顶层也塞一遍 has_*，不碰 pay_groups 里任何东西 ====
  let pxx = JSON.parse($response.body);
  if (!pxx.data) pxx.data = {};
  pxx.data.has_membership = true;
  pxx.data.has_lifetime_membership = true;
  pxx.data.already_has_lifetime_membership = true;
  pxx.data.is_diamond = true;
  $done({ body: JSON.stringify(pxx) });
}
else if (typeof $request != 'undefined' && $request.body && $request.url.indexOf('/infoc/events') != -1) {
  // ==== 学 GTP4ohd.js：纯字符串正则替换，不 JSON.parse，避免任何解析异常 ====
  let s = $request.body;
  s = s.replace(/"has_membership"\s*:\s*false/g, '"has_membership":true');
  s = s.replace(/"has_lifetime_membership"\s*:\s*false/g, '"has_lifetime_membership":true');
  s = s.replace(/"already_has_lifetime_membership"\s*:\s*false/g, '"already_has_lifetime_membership":true');
  s = s.replace(/"requires_membership"\s*:\s*true/g, '"requires_membership":false');
  s = s.replace(/"subtitle_requires_membership"\s*:\s*true/g, '"subtitle_requires_membership":false');
  $done({ body: s });
}
else {
  $done({});
}
