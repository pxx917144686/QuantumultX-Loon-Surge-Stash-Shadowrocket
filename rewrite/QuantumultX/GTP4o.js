/*
GTP4o + HD版 @ pxx917144686 商店下载地址：https://apps.apple.com/us/app/ai%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E8%81%8A%E5%A4%A9%E6%9C%BA%E5%99%A8%E4%BA%BA/id6449283733?l=zh-Hans-CN  

[rewrite_local]

https://nichousha.sjrjyffs.top/api/img/aiSketch url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/GTP4ohd.js
https://nichousha.sjrjyffs.top/api/app/user/getCurrentInfo url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/GTP4o.js

[mitm]
hostname = nichousha.sjrjyffs.top
*/
if ($request.url.includes('api/app/user/getCurrentInfo')) {
    let body = JSON.parse($response.body);
    Object.assign(body.data, { vipStatus: "1", nickname: "Baby", vipLabel: "1", imgNum: 12345 });
    $done({ body: JSON.stringify(body) });
} else {
    $done({});
}
