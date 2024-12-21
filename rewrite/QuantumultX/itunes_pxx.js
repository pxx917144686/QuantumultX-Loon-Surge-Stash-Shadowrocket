/*
# @ pxx917144686

[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/itunes_pxx.js
[mitm]
hostname = buy.itunes.apple.com

*************************************/

var pxx917144686 = JSON.parse($response.body);
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const bundle_id = pxx917144686.receipt["bundle_id"] || pxx917144686.receipt["Bundle_Id"];
const yearid = `${bundle_id}.year`;
const yearlyid = `${bundle_id}.yearly`;
const yearlysubscription = `${bundle_id}.yearlysubscription`;
const lifetimeid = `${bundle_id}.lifetime`;

const list = {
  'ProKnockOut': { cm: 'timeb', hx: 'hxpda', id: "com.knockout.SVIP.50off", latest: "pxx917144686" },  //ProKnockOut
  'me.imgbase.imgplay': { cm: 'timea', hx: 'hxpda', id: "me.imgbase.imgplay.subscriptionYearly", latest: "pxx917144686" }, //ImgPlay: GIF Maker
  'MVH6DNU2ZP.input': { cm: 'timea', hx: 'hxpda', id: "com.logcg.loginput", latest: "pxx917144686" }, //落格输入法 经典版
  'ChickAlarmClock': { cm: 'timea', hx: 'hxpda', id: "com.ChickFocus.ChickFocus.yearly_2023_promo", latest: "pxx917144686" }, //小鸡专注
  'co.vulcanlabs.moodtracker': { cm: 'timea', hx: 'hxpda', id: "co.vulcanlabs.moodtracker.lifetime2", latest: "pxx917144686" } //AI Chatbot: AI Chat Smith 4
};

//内购数据变量
const receipt = { "quantity": "1", "purchase_date_ms": "1694250549000", "is_in_intro_offer_period": "false", "transaction_id": "490001314520000", "is_trial_period": "false", "original_transaction_id": "490001314520000", "purchase_date": "2023-09-09 09:09:09 Etc/GMT", "product_id": yearlyid, "original_purchase_date_pst": "2023-09-09 02:09:10 America/Los_Angeles", "in_app_ownership_type": "PURCHASED", "original_purchase_date_ms": "1694250550000", "web_order_line_item_id": "490000123456789", "purchase_date_pst": "2023-09-09 02:09:09 America/Los_Angeles", "original_purchase_date": "2023-09-09 09:09:10 Etc/GMT" };
const expirestime = { "expires_date": "2099-09-09 09:09:09 Etc/GMT", "expires_date_pst": "2099-09-09 06:06:06 America/Los_Angeles", "expires_date_ms": "4092599349000", };
let anchor = false;
let data;

// 核心内容处理
for (const i in list) {
  const regex = new RegExp(`^${i}`, `i`);
  if (regex.test(ua) || regex.test(bundle_id)) {
    const { cm, hx, id, ids, latest, version } = list[i];
    const receiptdata = Object.assign({}, receipt, { "product_id": id });
    //处理数据
    switch (cm) {
      case 'timea':
        data = [ Object.assign({}, receiptdata, expirestime)];
        break;
      case 'timeb':
        data = [receiptdata];
        break;
      case 'timec':
        data = [];
        break;
      case 'timed':
        data = [
          Object.assign({}, receiptdata, expirestime, { "product_id": ids }),
          Object.assign({}, receiptdata, expirestime, { "product_id": id })
        ];
        break;
    }
    //处理核心收尾
    if (hx.includes('hxpda')) {
      pxx917144686["receipt"]["in_app"] = data;
      pxx917144686["latest_receipt_info"] = data;
      pxx917144686["pending_renewal_info"] = [{ "product_id": id, "original_transaction_id": "490001314520000", "auto_renew_product_id": id, "auto_renew_status": "1" }];
      pxx917144686["latest_receipt"] = latest;
    }
    else if (hx.includes('hxpdb')) {
      pxx917144686["receipt"]["in_app"] = data;
    }
    else if (hx.includes('hxpdc')) {
      const xreceipt = { "expires_date_formatted" : "2099-09-09 09:09:09 Etc/GMT", "expires_date" : "4092599349000", "expires_date_formatted_pst" : "2099-09-09 06:06:06 America/Los_Angeles", "product_id" : id, };
      pxx917144686["receipt"] = Object.assign({}, pxx917144686["receipt"], xreceipt);
      pxx917144686["latest_receipt_info"] = Object.assign({}, pxx917144686["receipt"], xreceipt);
      pxx917144686["status"] = 0;
      pxx917144686["auto_renew_status"] = 1;
      pxx917144686["auto_renew_product_id"] = id;
      delete pxx917144686["latest_expired_receipt_info"];
      delete pxx917144686["expiration_intent"];
    }
    // 判断是否需要加入版本号
    if (version && version.trim() !== '') { pxx917144686["receipt"]["original_application_version"] = version; }
    anchor = true;
    console.log('操作成功');
    break;
  }
}

// 如果没有匹配到 UA 或 bundle_id 使用备用方案
if (!anchor) {
  data = [ Object.assign({}, receipt, expirestime)];
  pxx917144686["receipt"]["in_app"] = data;
  pxx917144686["latest_receipt_info"] = data;
  pxx917144686["pending_renewal_info"] = [{ "product_id": yearlyid, "original_transaction_id": "490001314520000", "auto_renew_product_id": yearlyid, "auto_renew_status": "1" }];
  pxx917144686["latest_receipt"] = "pxx917144686";
  console.log('使用备用方案');
}

pxx917144686["Telegram"] = "测试";
pxx917144686["warning"] = "测试";

$done({ body: JSON.stringify(pxx917144686) });

