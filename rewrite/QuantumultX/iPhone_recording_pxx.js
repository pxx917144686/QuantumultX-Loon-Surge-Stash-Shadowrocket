[rewrite_local]
^http:\/\/call-recorder\.xinmengmakeji\.com\/ url script-response-body https://raw.githubusercontent.com/afengye/QX/main/luyin.js
[mitm] 
hostname = call-recorder.xinmengmakeji.com
*******************************/

😊😊😊 pxx917144686

var pxx = $response.body;
var obj = JSON.parse(pxx);

if ($request.url.indexOf("/api/user") != -1) {
    obj.data.phone = decrypt("pxx"); // 
    obj.data.vip_expiry_date = "2099-01-01 00:00:00"; // 
}

pxx = JSON.stringify(obj);
$done(pxx);

(function () {
    const obfuscate = (input) => {
        let result = '', charCode;
        for (let i = 0; i < input.length; i++) {
            charCode = input.charCodeAt(i) + 5;
            result += String.fromCharCode(charCode);
        }
        return result;
    };

    const deobfuscate = (input) => {
        let result = '', charCode;
        for (let i = 0; i < input.length; i++) {
            charCode = input.charCodeAt(i) - 5;
            result += String.fromCharCode(charCode);
        }
        return result;
    };

    const decrypt = (input) => {
        return deobfuscate(input);
    };

    let originalCode = 'var pxx = $response.body; var obj = JSON.parse(pxx); if ($request.url.indexOf("/api/user") != -1) { obj.data.phone = decrypt("afengye"); obj.data.vip_expiry_date = "2099-01-01 00:00:00"; } pxx = JSON.stringify(obj); $done(pxx);';
    let obfuscatedCode = obfuscate(originalCode);

    eval(deobfuscate(obfuscatedCode));
})();
