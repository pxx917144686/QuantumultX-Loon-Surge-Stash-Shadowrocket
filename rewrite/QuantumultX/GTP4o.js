/*
GTP4o 以及 HD版   基于  YU9191 的数据
[rewrite_local]
https://nichousha.sjrjyffs.top/api/img/aiSketch url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/GTP4ohd.js
https://nichousha.sjrjyffs.top/api/app/user/getCurrentInfo url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/GTP4o.js

[mitm]
hostname = nichousha.sjrjyffs.top

脚本编辑人: pxx917144686
*/
if ($request.url.includes('api/app/user/getCurrentInfo')) {
    let body = JSON.parse($response.body);
    Object.assign(body.data, { vipStatus: "1", nickname: "Baby", vipLabel: "1", imgNum: 9999 });
    $done({ body: JSON.stringify(body) });
} else {
    $done({});
}
