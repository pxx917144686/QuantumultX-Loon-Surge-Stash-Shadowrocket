/*
 * picsew 破解    @ pxx917144686
[rewrite_local]

http://106.54.2.168/emmoDiary/user/getUser url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/picsew.js



/*
var obj = JSON.parse($response.body);
obj = {
    "receipt": {
    "receipt_type": "Production",
    "adam_id": 1495046702,
    "app_item_id": 1208145167,
    "bundle_id": "com.sugarmo.ScrollClip",
    "application_version": "3082",
    "download_id": 8888,
    "version_external_identifier": 0,
    "receipt_creation_date": "2020-09-13 13:07:00 Etc/GMT",
    "receipt_creation_date_ms": "1600002420000",
    "receipt_creation_date_pst": "2020-09-13 06:07:00 America/Los_Angeles",
    "request_date": "2020-09-13 10:32:58 Etc/GMT",
    "request_date_ms": "1599993178857",
    "request_date_pst": "2020-09-13 02:43:08 America/Los_Angeles",
    "original_purchase_date": "2020-05-27 14:46:29 Etc/GMT",
    "original_purchase_date_ms": "1590590789000",
    "original_purchase_date_pst": "2020-05-27 07:46:29 America/Los_Angeles",
    "original_application_version": "9",
    "in_app": []
  },
  "status": 0,
  "environment": "Production"
  }
$done({body: JSON.stringify(obj)});
