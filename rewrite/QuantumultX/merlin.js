/*
 * Merlin - Chat with 4.0 AI 解锁专业版功能
 * 脚本作者: pxx917144686
 * 解锁 PRO 专业版功能
 */

[rewrite_local]
^https:\/\/api\.merlinapp\.com\/.*\/user\/profile url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/merlin.js

[mitm]
hostname = api.merlinapp.com
*/

// 检查 URL 并修改响应体
if ($request.url.includes('user/profile')) {
    let body = JSON.parse($response.body);
    
    // 确保数据路径存在
    if (body.data && body.data.user) {
        Object.assign(body.data.user, {
            isProUser: true,
            proEndTime: "2029-11-16",
            subscription: "PRO"
        });
    }

    // 转换回字符串并替换字段
    body = JSON.stringify(body)
        .replace(/"userPlan":"FREE"/g, '"userPlan":"PRO"')
        .replace(/"type":"FREE"/g, '"type":"PRO"');
    
    $done({ body });
} else {
    $done({});
}
