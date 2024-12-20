/*
# @ pxx917144686

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/Reheji_pxx.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/Reheji_pxx.js
[mitm]
hostname = api.revenuecat.com, api.rc-backup.com
*************************************/
const obj = {};

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  obj.headers = $request.headers;
} else {
  let body = JSON.parse($response.body || "{}");
  
  if (body && body.subscriber) {
    let date = {
      "expires_date": "2999-01-01T00:00:00Z",
      "original_purchase_date": "2021-01-01T00:00:00Z",
      "purchase_date": "2021-01-01T00:00:00Z",
      "ownership_type": "PURCHASED",
      "store": "app_store"
    };

    let subscriber = body.subscriber;
    let bundle_id = $request.headers["X-Client-Bundle-ID"] || $request.headers["User-Agent"].match(/^[%a-zA-Z0-9]+/)[0];

    // APP
    const list = {
      '%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },

    };

    // 订阅信息
    for (const key in list) {
      if (new RegExp(`^${key}`, 'i').test(bundle_id)) {
        const { name, id } = list[key];
        
        // 设置订阅信息
        subscriber.subscriptions = subscriber.subscriptions || {};
        subscriber.entitlements = subscriber.entitlements || {};

        subscriber.subscriptions[id] = date;
        subscriber.entitlements[name] = { ...date, product_identifier: id };
        
        break; // 找到匹配的应用后跳出循环
      }
    }

    // 返回修改后的body
    obj.body = JSON.stringify(body);
  }
}

$done(obj);
