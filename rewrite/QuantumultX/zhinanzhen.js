[rewrite_local]
^https:\/\/compass\.xinzhi\.space\/api\/v1\/isVip url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/zhinanzhen.js
[mitm] 
hostname = compass.xinzhi.space
*******************************/

var pxx = $response.body;
var obj =  JSON.parse(pxx);

obj.data.is_vip = 1;

pxx = JSON.stringify(obj);
$done(pxx);