/*
 * VidHub 配置拦截
[rewrite_local]
https://api.7littlemen.com/Vidhub/native_config.json url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/VidHub.js
*/

var body = $response.body;
let obj = JSON.parse(body);

// 修改API返回的配置，设置为一次性支付
obj.data["IsOneTimePayment"] = true;

body = JSON.stringify(obj);
$done({body});
