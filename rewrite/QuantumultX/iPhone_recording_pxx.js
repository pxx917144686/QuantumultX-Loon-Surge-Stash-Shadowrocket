[rewrite_local]
^http:\/\/call-recorder\.xinmengmakeji\.com\/ url script-response-body https://raw.githubusercontent.com/afengye/QX/main/luyin.js
[mitm] 
hostname = call-recorder.xinmengmakeji.com
*******************************/

😊😊😊 pxx917144686

var pxx = $response.body;
var obj = JSON.parse(pxx);

if ($request.url.indexOf("/api/user") != -1) {
    obj.data.phone = decrypt("afengye"); // Replace "pxx" 
    obj.data.vip_expiry_date = "2099-01-01 00:00:00"; // 
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
        obj.data.phone = decrypt("afengye"); // Replace with actual decryption logic
        obj.data.vip_expiry_date = "2099-01-01 00:00:00"; // Update VIP expiry date
    }

    $done(JSON.stringify(obj));
})();
