[rewrite_local]
^http:\/\/call-recorder\.xinmengmakeji\.com\/ url script-response-body https://raw.githubusercontent.com/afengye/QX/main/luyin.js
[mitm] 
hostname = call-recorder.xinmengmakeji.com
*******************************/

var aFengYe = $response.body;
var obj =  JSON.parse(pxx);

if($request.url.indexOf("/api/user") != -1) {
    obj.data.phone = "pxx";
    obj.data.vip_expiry_date = "2029-01-01 00:00:00";
}

aFengYe = JSON.stringify(obj);
$done(pxx);
