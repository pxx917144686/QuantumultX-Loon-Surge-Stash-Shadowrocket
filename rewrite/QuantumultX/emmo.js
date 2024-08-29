/*
 * Emmo日记  需要登录 破解有效    @ pxx917144686
[rewrite_local]

http://106.54.2.168/emmoDiary/user/getUser url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/emmo.js



/*
Unlocks by Wangzp
*/
var body = $response.body;
let obj = JSON.parse(body);
obj.data.user["isLifeVip"] = "1",
obj.data.user["isVip"] = "1",
obj.data.user["isApplePurchase"] = true,
obj.data.user["vipEndTime"] = "2029-11-16",
body = JSON.stringify(obj);
$done({body});
