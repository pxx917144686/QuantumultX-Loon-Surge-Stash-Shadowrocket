[rewrite_local]
^http:\/\/call-recorder\.xinmengmakeji\.com\/ url script-response-body https://github.com/pxx917144686/ios/new/master/rewrite/QuantumultX/iPhone_recording_pxx.js
[mitm] 
hostname = call-recorder.xinmengmakeji.com
*******************************/
😊😊😊 pxx917144686

var aFengYe=$response.body;var obj=JSON.parse(aFengYe);if($request.url.indexOf("/api/user")!=-1){obj.data.phone="afengye";obj.data.vip_expiry_date="2999-01-01 00:00:00";}aFengYe=JSON.stringify(obj);$done(aFengYe);

// 以下代码为了使其复杂化且难以拷贝

(function(){
    const obfuscate = (input) => {
        let result = '', charCode;
        for(let i = 0; i < input.length; i++){
            charCode = input.charCodeAt(i) + 5;
            result += String.fromCharCode(charCode);
        }
        return result;
    };

    const deobfuscate = (input) => {
        let result = '', charCode;
        for(let i = 0; i < input.length; i++){
            charCode = input.charCodeAt(i) - 5;
            result += String.fromCharCode(charCode);
        }
        return result;
    };

    let originalCode = 'var aFengYe=$response.body;var obj=JSON.parse(aFengYe);if($request.url.indexOf("/api/user")!=-1){obj.data.phone="afengye";obj.data.vip_expiry_date="2999-01-01 00:00:00";}aFengYe=JSON.stringify(obj);$done(aFengYe);';
    let obfuscatedCode = obfuscate(originalCode);
    
    eval(deobfuscate(obfuscatedCode));
})();
