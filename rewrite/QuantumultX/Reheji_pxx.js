/*
# @ pxx917144686

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/Reheji_pxx.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/Reheji_pxx.js
[mitm]
hostname = api.revenuecat.com, api.rc-backup.com
*************************************/
const pxx917144686 = {};
const pxx = JSON.parse($response.body || "{}");

const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];
const bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

// 应用信息映射
const list = {
  '%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },  //目标地图
  // 在此处可以添加更多的映射关系
};

// 内购数据
const data = {
  "expires_date": "2099-09-09T09:09:09Z",  
  "original_purchase_date": "2023-06-06T06:06:06Z", 
  "purchase_date": "2023-06-06T06:06:06Z", 
  "ownership_type": "PURCHASED", 
  "store": "app_store", 
  "product_identifier": "com.example.app.product1" 
};

// 匹配并设置订阅信息
for (const key in list) {
  if (new RegExp(`^${key}`, 'i').test(bundle_id)) {
    const { name, id } = list[key];
    pxx.subscriber = pxx.subscriber || { subscriptions: {}, entitlements: {} };
    pxx.subscriber.subscriptions[id] = data;
    pxx.subscriber.entitlements[name] = { ...data, product_identifier: id };
    break;
  }
}

// 更新响应内容
$done({ body: JSON.stringify(pxx) });
