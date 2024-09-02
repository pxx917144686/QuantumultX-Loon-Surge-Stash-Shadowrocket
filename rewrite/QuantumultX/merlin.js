/*
 * Merlin - Chat with 4.0 AI 解锁专业版功能
 * 脚本作者: pxx917144686
 * 解锁 PRO 专业版功能
 */

[rewrite_local]
^https:\/\/api\.merlinapp\.com\/.*\/user\/profile url script-response-body merlin_pro.js

[mitm] 
hostname = api.merlinapp.com

// 以下是 `merlin_pro.js` 脚本文件的内容:
var body = $response.body;
let obj = JSON.parse(body);

// 修改用户对象以解锁专业版功能
obj.data.user["isProUser"] = true; // 设置 PRO 用户标志
obj.data.user["proEndTime"] = "2029-11-16"; // 设置 PRO 会员到期日期
obj.data.user["subscription"] = "PRO"; // 修改订阅计划

// 转换回字符串
body = JSON.stringify(obj);

// 如果上述字段未覆盖所有情况，则进行附加替换
body = body.replace(/"userPlan":"FREE"/g, '"userPlan":"PRO"');
body = body.replace(/"type":"FREE"/g, '"type":"PRO"');

$done({ body });
