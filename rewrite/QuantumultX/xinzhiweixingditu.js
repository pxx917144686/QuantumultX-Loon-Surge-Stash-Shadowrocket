/******************************************
 * 新知卫星地图  需要登录账号
 * pxx917144686
 * apple商店：https://apps.apple.com/us/app/%E6%96%B0%E7%9F%A5%E5%8D%AB%E6%98%9F%E5%9C%B0%E5%9B%BE-%E6%B5%B7%E6%8B%94%E6%9F%A5%E8%AF%A2/id1526845210?l=zh-Hans-CN
 ******************************************




[rewrite_local]
^https:\/\/a\.xinzhi\.space\/api\/User\/getUserByToken url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/refs/heads/master/rewrite/QuantumultX/xinzhiweixingditu.js
[mitm] 
hostname = a.xinzhi.space
*******************************************/
var pxx = $response.body;
var obj =  JSON.parse(pxx);

var vipInfo = {
  "vip_type":"永久会员",
  "vip_expire": "2066-01-01 00:00:00",
  "is_vip": 1,
  "vip_day": 99999
}

for (let key in obj.data) {
  if (vipInfo.hasOwnProperty(key)) {
     obj.data[key] = vipInfo[key]
  }
}


pxx = JSON.stringify(obj);
$done(pxx);


pxx = JSON.stringify(obj);
$done(pxx);

