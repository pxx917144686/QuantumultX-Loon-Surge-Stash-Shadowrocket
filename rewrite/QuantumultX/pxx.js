[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://github.com/pxx917144686/ios/new/master/rewrite/QuantumultX/pxx.js

[MITM]
hostname = buy.itunes.apple.com

*/
var pxx917144686 = {};
var pxx = JSON.parse(typeof $response != "undefined" && $response.body || null);
var headers = {};
for (var key in $request.headers) {
  const reg = /^[a-z]+$/;
  if (key === "User-Agent" && !reg.test(key)) {
    var lowerkey = key.toLowerCase();
    $request.headers[lowerkey] = $request.headers[key];
    delete $request.headers[key];
  }
}
var UA = $request.headers['user-agent'];
var uaProductMapping = {
  'CHAT%20AI': {product_id: 'pxx917144686'},
};
var receipt = {
  "quantity": "1",
  "purchase_date_ms": "1686002766000",
  "expires_date": "1234-00-00 00:00:00 Etc\/GMT",
  "expires_date_pst": "1234-00-00 00:00:00 America\/Los_Angeles",
  "is_in_intro_offer_period": "false",
  "transaction_id": "666666666666666",
  "is_trial_period": "false",
  "original_transaction_id": "666666666666666",
  "purchase_date": "2024-06-26 06:00:00 Etc\/GMT",
  "product_id": "pxx917144686",
  "original_purchase_date_pst": "2024-06-26 06:00:00 America\/Los_Angeles",
  "in_app_ownership_type": "PURCHASED",
  "subscription_group_identifier": "20877951",
  "original_purchase_date_ms": "1686002766000",
  "web_order_line_item_id": "666666666666666",
  "expires_date_ms": "148204937166000",
  "purchase_date_pst": "2024-06-26 06:00:00 America\/Los_Angeles",
  "original_purchase_date": "2024-06-26 06:00:00 Etc\/GMT"
}
var renewal = {
  "expiration_intent": "1",
  "product_id": "pxx917144686",
  "is_in_billing_retry_period": "0",
  "auto_renew_product_id": "pxx917144686",
  "original_transaction_id": "666666666666666",
  "auto_renew_status": "0"
}
for (var uaKey in uaProductMapping) {
  if (UA && UA.includes(uaKey)) {
    var productInfo = uaProductMapping[uaKey];
    var product_id = productInfo.product_id;
    receipt.product_id = product_id;
    renewal.product_id = product_id;
    renewal.auto_renew_product_id = product_id;
    guding6.receipt.in_app = [receipt];
    guding6.latest_receipt_info = [receipt];
    guding.pending_renewal_info = [renewal];
    break;
  }
}
pxx917144686 = pxx;
$done({ body: JSON.stringify(pxx917144686) });
