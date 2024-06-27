[rewrite_local]
^http:\/\/call-recorder\.xinmengmakeji\.com\/ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/iPhone_recording_pxx.js
[mitm] 
hostname = call-recorder.xinmengmakeji.com
*******************************/

😊😊😊 pxx917144686

var pxx = $response.body;
var obj = JSON.parse(pxx);

if ($request.url.indexOf("/api/user") != -1) {
    obj.data.phone = decrypt("pxx"); // 替换成 "pxx" 
    obj.data.vip_expiry_date = "2099-01-01 00:00:00"; // VIP 有效期
}

pxx = JSON.stringify(obj);
$done(pxx);

// pxx917144686

(function () {
    const decrypt = (input) => {
        let result = '';
        for (let i = 0; i < input.length; i++) {
            result += String.fromCharCode(input.charCodeAt(i) - 5);
        }
        return result;
    };

    let pxx = $response.body;
    let obj = JSON.parse(pxx);

    if ($request.url.indexOf("/api/user") != -1) {
        obj.data.phone = decrypt("pxx"); // 解密逻辑
        obj.data.vip_expiry_date = "2099-01-01 00:00:00"; // VIP 有效期
    }

    $done(JSON.stringify(obj));
})();
