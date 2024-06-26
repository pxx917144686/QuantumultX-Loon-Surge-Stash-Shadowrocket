{\rtf1\ansi\ansicpg936\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww18100\viewh11400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs26 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 [rewrite_local]\
^https?:\\/\\/buy\\.itunes\\.apple\\.com\\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/pxx.js\
\
[MITM]\
hostname = buy.itunes.apple.com\
\
*/\
var guding = \{\};\
var guding6 = JSON.parse(typeof $response != "undefined" && $response.body || null);\
\
// Normalize headers to lower case\
Object.keys($request.headers).forEach(key => \{\
  if (key === "User-Agent") \{\
    const lowerKey = key.toLowerCase();\
    $request.headers[lowerKey] = $request.headers[key];\
    delete $request.headers[key];\
  \}\
\});\
\
var UA = $request.headers['user-agent'];\
var uaProductMapping = \{\
  'CHAT%20AI': \{product_id: 'pxx917144686'\}\
\};\
\
var receipt = \{\
  "quantity": "1",\
  "purchase_date_ms": "1686002766000",\
  "expires_date": "6666-06-06 06:06:06 Etc/GMT",\
  "expires_date_pst": "6666-06-06 06:06:06 America/Los_Angeles",\
  "is_in_intro_offer_period": "false",\
  "transaction_id": "666666666666666",\
  "is_trial_period": "false",\
  "original_transaction_id": "666666666666666",\
  "purchase_date": "2024-06-26 12:00:00 Etc/GMT",\
  "product_id": "https://t.me/Guding88",\
  "original_purchase_date_pst": "2024-06-26 12:00:00 America/Los_Angeles",\
  "in_app_ownership_type": "PURCHASED",\
  "subscription_group_identifier": "20877951",\
  "original_purchase_date_ms": "1686002766000",\
  "web_order_line_item_id": "666666666666666",\
  "expires_date_ms": "148204937166000",\
  "purchase_date_pst": "2024-06-26 12:00:00 America/Los_Angeles",\
  "original_purchase_date": "2024-06-26 12:00:00 Etc/GMT"\
\};\
\
var renewal = \{\
  "expiration_intent": "1",\
  "product_id": "pxx917144686",\
  "is_in_billing_retry_period": "0",\
  "auto_renew_product_id": "pxx917144686",\
  "original_transaction_id": "666666666666666",\
  "auto_renew_status": "0"\
\};\
\
if (UA && uaProductMapping['CHAT%20AI'] && UA.includes('CHAT%20AI')) \{\
  var productInfo = uaProductMapping['CHAT%20AI'];\
  receipt.product_id = productInfo.product_id;\
  renewal.product_id = productInfo.product_id;\
  renewal.auto_renew_product_id = productInfo.product_id;\
  guding6.receipt.in_app = [receipt];\
  guding6.latest_receipt_info = [receipt];\
  guding.pending_renewal_info = [renewal];\
\}\
\
$done(\{ body: JSON.stringify(pxx917144686) \});\
}