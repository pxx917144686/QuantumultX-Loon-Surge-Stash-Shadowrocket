/*
SubPlayer 解锁Pro/永久钻石会员 @ pxx917144686
【100% HHH.js/YD.js/emmo.js极简风格：只改HAR真实响应中已存在的key，绝不擅自新增顶层字段！】
【user_info接口 HAR实锤只有 data.user_info + data.vip_info_list([]) + data.permission_list([])  → 只改后两个，其他不动！】
【vip_info_list字段名 100%来自 HAR list_group.page_detail（实锤）：product_id/app_store_product_id/microsoft_store_product_id/is_diamond/is_continuous】
【list_group接口HAR实锤只有pay_groups（页面展示用），绝不去瞎改！】

[rewrite_local]
^https?:\/\/meivipapi\.icewx\.com\/usermix\/user_info url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/infoc\/events url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js

[mitm]
hostname = meivipapi.icewx.com
*/

const FAR_MS = 4092599349000;

if (typeof $response != 'undefined' && $response.body && $request.url.indexOf('/usermix/user_info') != -1) {
  // ==== 100% HHH.js 写法：JSON.parse → 只改已存在的 key → $done ====
  let response = JSON.parse($response.body);
  response.data.vip_info_list = [
    {
      product_id: '1000003',
      app_store_product_id: 'com.meijietech.subplayer.lifetime',
      microsoft_store_product_id: '9PPSLR8BM021',
      vip_type: 3,
      is_diamond: true,
      is_continuous: false,
      has_membership: true,
      has_lifetime_membership: true,
      expires_at_ms: FAR_MS,
      created_at_ms: 1666666666000,
      order_id: 'SPLIFETIME6666666666666666'
    }
  ];
  response.data.permission_list = [
    { permission_type: 'subtitle_ai_generate' },
    { permission_type: 'subtitle_translate' },
    { permission_type: 'no_ad' }
  ];
  $done({ body: JSON.stringify(response), status: 200 });
}
else if (typeof $request != 'undefined' && $request.body && $request.url.indexOf('/infoc/events') != -1) {
  // ==== 100% xiaobaixuexi.js 写法：纯字符串正则，绝不 JSON.parse ====
  let body = $request.body;
  body = body.replace(/"has_membership"\s*:\s*false/g, '"has_membership":true');
  body = body.replace(/"has_lifetime_membership"\s*:\s*false/g, '"has_lifetime_membership":true');
  body = body.replace(/"already_has_lifetime_membership"\s*:\s*false/g, '"already_has_lifetime_membership":true');
  body = body.replace(/"requires_membership"\s*:\s*true/g, '"requires_membership":false');
  body = body.replace(/"subtitle_requires_membership"\s*:\s*true/g, '"subtitle_requires_membership":false');
  $done({ body });
}
else {
  $done({});
}
