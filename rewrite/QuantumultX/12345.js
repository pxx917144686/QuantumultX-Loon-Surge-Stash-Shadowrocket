/*
 * 某App破解     
 [rewrite_local]

 ^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/refs/heads/master/rewrite/QuantumultX/12345.js

 [MITM]
 hostname = buy.itunes.apple.com
 /*
 * App破解脚本 by pxx917144686
 */

var body = $response.body;
var obj = JSON.parse(body);

// 构造伪造的收据信息
var receipt = {
  "quantity": "1",
  "purchase_date_ms": "1686002766000",
  "expires_date": "6666-06-06 06:06:06 Etc\/GMT",
  "expires_date_pst": "6666-06-06 06:06:06 America/Los_Angeles",
  "is_in_intro_offer_period": "false",
  "transaction_id": "666666666666666",
  "is_trial_period": "false",
  "original_transaction_id": "666666666666666",
  "purchase_date": "2024-10-01 06:06:06 Etc/GMT",
  "product_id": "pxx917144686",
  "original_purchase_date_pst": "2024-10-01 06:06:06 America/Los_Angeles",
  "in_app_ownership_type": "PURCHASED",
  "subscription_group_identifier": "20877951",
  "original_purchase_date_ms": "1686002766000",
  "web_order_line_item_id": "666666666666666",
  "expires_date_ms": "148204937166000",
  "purchase_date_pst": "2024-10-01 06:06:06 America/Los_Angeles",
  "original_purchase_date": "2024-10-01 06:06:06 Etc/GMT"
};

// 构造伪造的续订信息
var renewal = {
  "expiration_intent": "1",
  "product_id": "pxx917144686",
  "is_in_billing_retry_period": "0",
  "auto_renew_product_id": "pxx917144686",
  "original_transaction_id": "666666666666666",
  "auto_renew_status": "0"
};

// 更新收据信息
obj.receipt.in_app = [receipt];
obj.latest_receipt_info = [receipt];
obj.pending_renewal_info = [renewal];

// 返回修改后的 JSON
$done({ body: JSON.stringify(obj) });
