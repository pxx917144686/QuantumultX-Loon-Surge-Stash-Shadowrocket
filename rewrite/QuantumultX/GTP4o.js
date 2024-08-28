/*
GTP4o 以及 HD版   基于  YU9191 的数据

GTP4o 应用下载地址（Apple 商店）: [在此插入 GTP4o 的下载地址]
HD版 应用下载地址（Apple 商店）: [在此插入 HD版 的下载地址]

[rewrite_local]

# 将 GTP4o 的请求重定向到本地脚本
https://nichousha.sjrjyffs.top/api/img/aiSketch url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/GTP4ohd.js

# 将 HD版 的请求重定向到本地脚本
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
