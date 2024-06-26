{\rtf1\ansi\ansicpg936\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 [rewrite_local]\
^https?:\\/\\/buy\\.itunes\\.apple\\.com\\/verifyReceipt$ url script-response-body https://gist.githubusercontent.com/pxx917144686/ccf81d0f8531194ebd73aa437dfe7507/raw/401b6145572d8cd9f53c9709a66779b50fd30257/chat%2520Smith_pxx.js\
\
[MITM]\
hostname = buy.itunes.apple.com\
\
*/\
var guding = \{\};\
var guding6 = JSON.parse(typeof $response != "undefined" && $response.body || null);\
var headers = \{\};\
for (var key in $request.headers) \{\
  const reg = /^[a-z]+$/;\
  if (key === "User-Agent" && !reg.test(key)) \{\
    var lowerkey = key.toLowerCase();\
    $request.headers[lowerkey] = $request.headers[key];\
    delete $request.headers[key];\
  \}\
\}\
var UA = $request.headers['user-agent'];\
var uaProductMapping = \{\
  'CHAT%20AI': \{product_id: 'https://t.me/Guding88'\},\
\};\
var receipt = \{\
  "quantity": "1",\
  "purchase_date_ms": "1686002766000",\
  "expires_date": "6666-06-06 06:06:06 Etc\\/GMT",\
  "expires_date_pst": "6666-06-06 06:06:06 America\\/Los_Angeles",\
  "is_in_intro_offer_period": "false",\
  "transaction_id": "666666666666666",\
  "is_trial_period": "false",\
  "original_transaction_id": "666666666666666",\
  "purchase_date": "2023-06-06 06:06:06 Etc\\/GMT",\
  "product_id": "https://t.me/Guding88",\
  "original_purchase_date_pst": "2023-06-06 06:06:06 America\\/Los_Angeles",\
  "in_app_ownership_type": "PURCHASED",\
  "subscription_group_identifier": "20877951",\
  "original_purchase_date_ms": "1686002766000",\
  "web_order_line_item_id": "666666666666666",\
  "expires_date_ms": "148204937166000",\
  "purchase_date_pst": "2023-06-06 06:06:06 America\\/Los_Angeles",\
  "original_purchase_date": "2023-06-06 06:06:06 Etc\\/GMT"\
\}\
var renewal = \{\
  "expiration_intent": "1",\
  "product_id": "https://t.me/Guding88",\
  "is_in_billing_retry_period": "0",\
  "auto_renew_product_id": "https://t.me/Guding88",\
  "original_transaction_id": "666666666666666",\
  "auto_renew_status": "0"\
\}\
for (var uaKey in uaProductMapping) \{\
  if (UA && UA.includes(uaKey)) \{\
    var productInfo = uaProductMapping[uaKey];\
    var product_id = productInfo.product_id;\
    receipt.product_id = product_id;\
    renewal.product_id = product_id;\
    renewal.auto_renew_product_id = product_id;\
    guding6.receipt.in_app = [receipt];\
    guding6.latest_receipt_info = [receipt];\
    guding.pending_renewal_info = [renewal];\
    break;\
  \}\
\}\
guding = guding6;\
$done(\{ body: JSON.stringify(guding) \});}