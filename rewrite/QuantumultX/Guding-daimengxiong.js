/*
呆萌熊APP 容器 @boqii
商店下载地址：https://apps.apple.com/tw/app/%E5%91%86%E8%90%8C%E7%86%8A%E7%95%AA%E8%8C%84%E9%92%9F-%E5%AD%A6%E9%9C%B8%E5%BF%85%E5%A4%87%E6%8F%90%E9%AB%98%E5%AD%A6%E4%B9%A0%E6%95%88%E7%8E%87%E7%A5%9E%E5%99%A8/id1360827510
*/

[rewrite_local]

https://appss.rhinox.cn url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/Guding-daimengxiong.js

[mitm] 
hostname = appss.rhinox.cn
*******************************/

var boqii = $response.body; // 获取响应体
var obj = JSON.parse(boqii); // 解析为 JSON 对象

// 检查请求路径是否包含目标接口
if ($request.url.indexOf("/app/account/getAccountInfo") != -1) {
    obj.result.type = "VIP";
    obj.result.freeFlag = "YES";
    obj.result.vipExpireDays = 99999999999;
    obj.result.vipExpireTime = "2999-01-01 00:00:00";
    obj.result.vipGroupInfos = [
       {
        "groupType": "TYPE_ONE",
        "vipType": "VIP",
        "autoPay": "YES"
      }
    ];
}

boqii = JSON.stringify(obj); // 将对象转换回字符串
$done(boqii); // 返回修改后的响应体
