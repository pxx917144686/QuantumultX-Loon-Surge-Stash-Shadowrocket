/*
# @ pxx917144686

[rewrite_local]
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/Reheji_pxx.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/Reheji_pxx.js
[mitm]
hostname = api.revenuecat.com, api.rc-backup.com

*************************************/
let pxx917144686 = {}, pxx = JSON.parse(typeof $response != "undefined" && $response.body || "{}");

const headers = $request.headers;
const ua = headers['User-Agent'] || headers['user-agent'];
const bundle_id = headers['X-Client-Bundle-ID'] || headers['x-client-bundle-id'];

const list = [
  '%E8%B0%9C%E5%BA%95%E6%97%B6%E9%92%9F': { name: 'Entitlement.Pro', id: 'tech.miidii.MDClock.pro', cm: 'sjb' },  //目标地图,
  'Penbook': { name: 'pro', id: 'penbook.lifetime01', cm: 'sjb' }  //Pencil Notes: Penbook
];

let subscriber = {};
for (let data of list) {
  if (bundle_id === data.bundle_id) {
    let product_id = data.product_id;
    let entitlements = data.entitlements;
    
    subscriber.subscriptions[product_id] = new Date().toISOString();
    
    for (let entitlement of entitlements) {
      subscriber.entitlements[entitlement] = new Date().toISOString();
      subscriber.entitlements[entitlement].product_identifier = product_id;
    }
    
    break;
  }
}

let obj = {};
obj.body = JSON.stringify(pxx);

$done(obj);
