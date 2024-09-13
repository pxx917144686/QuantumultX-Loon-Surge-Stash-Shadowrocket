[rewrite_local]
# >甜盐相机  解锁会员 @ pxx917144686
^https?:\/\/purchase-tianyan-api.tianyancam.com\/v1\/purchase\/subscription\/subscriber\/status url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/YTXJ.js
^http://api-ad\.kajicam.com/ad/pop/rule/v2 url reject
[mitm] 
hostname = purchase-qingtu-api.b612kaji.com,api-qingtu.kajicam.com,purchase-tianyan-api.tianyancam.com,api-ad.kajicam.com

*
*
*/

// 解密函数
function decrypt(encodedString, key) {
    let result = '';
    let values = encodedString.split('.');
    for (let i = 0; i < values.length - 1; i++) {
        result += String.fromCharCode(values[i] ^ key);
    }
    return result;
}

// 解密代码
var _0xb627c = ["117.", "68.108.100.107.108.123.76.113.121.123.108.122.122.96.102.103.", "117.", "92.103.98.103.102.126.103.41.72.90.93.41.125.112.121.108.51."];
function _0xec74d(_4, _5) {
    _5 = 9;
    var _, _2, _3 = "";
    _2 = _4.split(".");
    for (_ = 0; _ < _2.length - 1; _++) {
        _3 += String.fromCharCode(_2[_] ^ _5);
    }
    return _3;
}

// 原混淆代码的解密逻辑
function _0xdga62c(_c) {
    var _0x2a = "3|1|0|4|2".split(_0xec74d(_0xb627c[0]));
    var _0x359c1a = 0;
    while (true) {
        switch (+_0x2a[_0x359c1a++]) {
            case 0: var _3 = -1; continue;
            case 1: var _2 = []; continue;
            case 2: while (eval(String.fromCharCode(95, 51, 32, 60, 32, 95, 99, 46, 108, 101, 110, 103, 116, 104))) {
                eval(String.fromCharCode(95, 51, 43, 43));
                switch (_c[_3]) {
                    case _.push: {
                        eval(String.fromCharCode(95, 51, 43, 43));
                        _2.push(_c[_3]);
                        eval(String.fromCharCode(95, 52, 43, 43));
                        break;
                    }
                    case _.add: {
                        var op_1 = _2[eval(String.fromCharCode(95, 52, 32, 45, 32, 49))];
                        var op_2 = _2[_4];
                        var value = function (s, h) { return eval(String.fromCharCode(115, 32, 43, 32, 104)); }(op_1, op_2);
                        _2.push(value);
                        eval(String.fromCharCode(95, 52, 43, 43));
                        break;
                    }
                    case _.sub: {
                        var op_1 = _2[eval(String.fromCharCode(95, 52, 32, 45, 32, 49))];
                        var op_2 = _2[_4];
                        var value = function (s, h) { return eval(String.fromCharCode(115, 32, 45, 32, 104)); }(op_1, op_2);
                        _2.push(value);
                        eval(String.fromCharCode(95, 52, 43, 43));
                        break;
                    }
                    case _.mul: {
                        var op_1 = _2[eval(String.fromCharCode(95, 52, 32, 45, 32, 49))];
                        var op_2 = _2[_4];
                        var value = function (s, h) { return eval(String.fromCharCode(115, 32, 42, 32, 104)); }(op_1, op_2);
                        _2.push(value);
                        eval(String.fromCharCode(95, 52, 43, 43));
                        break;
                    }
                    case _.div: {
                        var op_1 = _2[_4 - 1];
                        var op_2 = _2[_4];
                        var value = function (s, h) { return eval(String.fromCharCode(115, 32, 47, 32, 104)); }(op_1, op_2);
                        _2.push(value);
                        _4++;
                        break;
                    }
                    case _.xor: {
                        var op_1 = _2[eval(String.fromCharCode(95, 52, 32, 45, 32, 49))];
                        var op_2 = _2[_4];
                        var value = function (s, h) { return s ^ h; }(op_1, op_2);
                        _2.push(value);
                        eval(String.fromCharCode(95, 52, 43, 43));
                        break;
                    }
                    case _.pop: {
                        return _2[_4];
                    }
                }
            }
            continue;
            case 3: var _ = { push: 32, add: 33, sub: 34, mul: 35, div: 36, pop: 37, xor: 38 }; continue;
            case 4: var _4 = -1; continue;
        }
        break;
    }
}

// 处理请求和响应
if ($request.url.includes("subscription/status")) {
    let body = JSON.parse($response.body);
    let decryptedValue = _0xdga62c([32, 906526, 32, 906526, 38, 37]);
    Object.assign(body, JSON.parse("} ...")); // 填入适当的解密数据
    $done({ body: JSON.stringify(body) });
} else {
    $done({});
}
