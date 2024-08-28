/*
GTP4o + HD版  数据 拷贝于 YU9191 

[rewrite_local]

https://nichousha.sjrjyffs.top/api/img/aiSketch url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/GTP4ohd.js
https://nichousha.sjrjyffs.top/api/app/user/getCurrentInfo url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/GTP4o.js

[mitm]
hostname = nichousha.sjrjyffs.top
*/
if ($request.url.includes('api/app/user/getCurrentInfo')) {
    let body = JSON.parse($response.body);
    Object.assign(body.data, { vipStatus: "1", nickname: "Baby", vipLabel: "1", imgNum: pxx917144686 });
    $done({ body: JSON.stringify(body) });
} else {
    $done({});
}
