/*
App Store 链接:https://apps.apple.com/app/id6450694828

[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/pxx.js

[MITM]
hostname = api.revenuecat.com

*/
// 订阅信息
const expirationData = {
  "quantity": "1",
  "purchase_date_ms": "1686002766000",  // 当前时间
  "expires_date": "2025-12-31 23:59:59 Etc/GMT",  // 未来时间
  "expires_date_pst": "2025-12-31 23:59:59 America/Los_Angeles",  // 合理的未来时间
  "is_in_intro_offer_period": "false",
  "transaction_id": "1000000134567890",  // 合理的支付 ID
  "is_trial_period": "false",
  "original_transaction_id": "1000000134567890",  // 合理的原始交易 ID
  "purchase_date": "2024-06-06 06:01:08 Etc/GMT",  // 接近当前日期
  "product_id": "com.example.app.subscription.premium_yearly",  // 更加真实的产品 ID
  "in_app_ownership_type": "PURCHASED",
  "subscription_group_identifier": "20987432",  // 合理的订阅识符
  "expires_date_ms": "1704064799000",  // 合理的未来时间
  "purchase_date_pst": "2024-06-06 06:06:06 America/Los_Angeles",  // 接近当前日期
  "original_purchase_date": "2024-06-06 06:01:08 Etc/GMT"  // 接近当前日期
};


// 应用列表
const appList = [
  { app_name: 'Ereasy', bundle_id: 'background.remover.bg.eraser', product_id: 'app.ereasy.ereasy.na.bold.pxx' },
];

let obj = {};

// 请求
if (typeof $response === "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  obj.headers = $request.headers;
} else {
  let body = JSON.parse($response.body || "{}");

  if (body.receipt) {
    const userAgent = $request.headers['User-Agent'];
    const matchedApp = appList.find(app => userAgent.includes(app.app_name) || userAgent.includes(app.bundle_id));

    if (matchedApp) {
      expirationData.product_id = matchedApp.product_id;
      body.receipt.in_app = [expirationData];
      body.latest_receipt_info = [expirationData];
      obj.body = JSON.stringify(body);
    }
  }
}

$done(obj);
