[rewrite_local]
// > DreamFacePro
^https?:\/\/dreamfaceapp\.com\/df-server\/user\/save_user_login$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/DreamFacePro.js

[mitm]
hostname = dreamfaceapp.com
******************************************/

// 解析响应的 JSON 数据
var response = JSON.parse($response.body);

// 重新构建响应对象
response = {
  "vip_product_id": "TRY_YEAR_PACKAGE",
  "data": {
    "rights": {
      "renewal": true,
      "vip_type": "YEAR",
      "vip_label": "Pro Membership",
      "vip_reminder_day": 999999,
      "expires_date": "2099-12-28T09:00:00.000Z",
      "have_trial": false,
      "expires_date_format": "2099-12-28 09:00:00"
    }
  }
};

// 将修改后的对象转换为字符串，并返回
$done({body: JSON.stringify(response)});
