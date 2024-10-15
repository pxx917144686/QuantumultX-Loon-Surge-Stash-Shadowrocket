/*
 * 某App破解     
 [rewrite_local]

 ^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/refs/heads/master/rewrite/QuantumultX/1234.js

 [MITM]
 hostname = buy.itunes.apple.com
 */

/*
 Unlocks by pxx917144686
 */

var guding6 = JSON.parse(typeof $response != "undefined" && $response.body || null);
var UA = $request.headers['user-agent'];

var uaProductMapping = {
  'ScreenRecord': { product_id: 'https://t.me/Guding88' },
  'bazaart': { product_id: 'Bazaart_Premium_Monthly_v9' },
  'Revive': { product_id: 'revive.inapp.pro.lt_wotrial_42.99' },
  'Picsew': { product_id: 'com.sugarmo.ScrollClip.pro' },
  'Air': { product_id: 'co.airapps.calculator.yearly' },
  'HashPhotos': { product_id: 'com.kobaltlab.HashPhotos.iap.allinone.free' },
  'ProxyFi': { product_id: 'week.proxyfi.sub' },
  'Side': { product_id: 'com.johnil.side.year' },
  'MyMemoryDebris': { product_id: 'com.chenxi.shannian.superNian' },
  // 其他映射信息
  'Scanner': { product_id: 'scannerapp.free.premium.subscription.m1mte' },
  'Carbon%20VPN': { product_id: 'Prog_oneYear_auto' },
  'Ever%20Play': { product_id: 'com.zhangchao.AudioPlayer.subscription.oneYear' }
};

var receiptTemplate = {
  "quantity": "1",
  "purchase_date_ms": "1686002766000",
  "expires_date": "6666-06-06 06:06:06 Etc\/GMT",
  "expires_date_pst": "6666-06-06 06:06:06 America\/Los_Angeles",
  "is_in_intro_offer_period": "false",
  "transaction_id": "666666666666666",
  "is_trial_period": "false",
  "original_transaction_id": "666666666666666",
  "purchase_date": "2023-06-06 06:06:06 Etc\/GMT",
  "product_id": "https://t.me/Guding88",
  "original_purchase_date_pst": "2023-06-06 06:06:06 America\/Los_Angeles",
  "in_app_ownership_type": "PURCHASED",
  "subscription_group_identifier": "20877951",
  "original_purchase_date_ms": "1686002766000",
  "web_order_line_item_id": "666666666666666",
  "expires_date_ms": "148204937166000",
  "purchase_date_pst": "2023-06-06 06:06:06 America\/Los_Angeles",
  "original_purchase_date": "2023-06-06 06:06:06 Etc\/GMT"
};

var renewalTemplate = {
  "expiration_intent": "1",
  "product_id": "https://t.me/Guding88",
  "is_in_billing_retry_period": "0",
  "auto_renew_product_id": "https://t.me/Guding88",
  "original_transaction_id": "666666666666666",
  "auto_renew_status": "0"
};

for (var uaKey in uaProductMapping) {
  if (UA && UA.includes(uaKey)) {
    var productInfo = uaProductMapping[uaKey];
    var product_id = productInfo.product_id;

    // 修改收据信息
    var receipt = Object.assign({}, receiptTemplate);
    var renewal = Object.assign({}, renewalTemplate);
    
    receipt.product_id = product_id;
    renewal.product_id = product_id;
    renewal.auto_renew_product_id = product_id;

    // 注入伪造的收据信息
    guding6.receipt.in_app = [receipt];
    guding6.latest_receipt_info = [receipt];
    guding6.pending_renewal_info = [renewal];

    break;
  }
}

$done({ body: JSON.stringify(guding6) });
