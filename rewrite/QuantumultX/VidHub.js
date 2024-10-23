/*
 * VidHub 配置拦截脚本
[rewrite_local]
https://api.7littlemen.com/path/to/settings url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/VidHub.js

*/

var body = $response.body;
let obj = JSON.parse(body);

// 修改API返回的用户支付状态
obj.data["IsOneTimePayment"] = true; 
body = JSON.stringify(obj);
$done({body});
