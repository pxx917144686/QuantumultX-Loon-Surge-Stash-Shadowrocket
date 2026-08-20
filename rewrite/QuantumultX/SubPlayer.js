/*
SubPlayer 解锁Pro/ @ pxx917144686

[rewrite_local]
^https?:\/\/meivipapi\.icewx\.com\/usermix\/user_info url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/infoc\/events url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js

[mitm]
hostname = meivipapi.icewx.com
*/

const VIP_ITEM = JSON.stringify({
  // ======== 产品ID（HAR list_group.page_detail 实锤）========
  product_id: '1000003',
  app_store_product_id: 'com.meijietech.subplayer.lifetime',
  microsoft_store_product_id: '9PPSLR8BM021',
  google_play_product_id: 'com.meijietech.subplayer.lifetime',
  default_product_id: '1000003',
  // ======== 类型等级（双写/三写保险：vip_type+type+level，int 3=钻石终身）========
  vip_type: 3,
  type: 3,
  level: 3,
  grade: 3,
  vip_level: 3,
  // ======== 状态布尔（strings 100%实锤）========
  is_diamond: true,
  has_membership: true,
  has_lifetime_membership: true,
  already_has_lifetime_membership: true,
  is_continuous: false,
  is_vip: true,
  is_member: true,
  is_pro: true,
  is_premium: true,
  is_paid_user: true,
  valid: 1,
  status: 1,
  active: true,
  // ======== 时间戳（所有命名变体全写上，总有一个命中）========
  expires_at_ms: 4092599349000,
  expires_at: 4092599349000,
  expiry_ms: 4092599349000,
  expire_time_ms: 4092599349000,
  expire_time: 4092599349,
  expires_in: 999999999,
  created_at_ms: 1666666666000,
  created_at: 1666666666,
  // ======== 订单标识（strings 实锤）========
  order_id: 'SPLIFETIME6666666666666666',
  transaction_id: 'SPLIFETIMETXN666666666'
});
// permission_type 值 100% 来自 strings 实锤的功能关键词
const PERMS = JSON.stringify([
  { permission_type: 'subtitle_generate' },
  { permission_type: 'subtitle_translate' },
  { permission_type: 'adblock' },
  { permission_type: 'subtitle' },
  { permission_type: 'diamond' }
]);

if (typeof $response != 'undefined' && $response.body && $request.url.indexOf('/usermix/user_info') != -1) {
  let body = $response.body;

  // ======== 验证1：昵称改成 QUANTUMULTX_OK_已拦截（用户进"我的"一眼就能看到变没变！）========
  body = body.replace(/"nickname"\s*:\s*"[^"]*"/g, '"nickname":"QUANTUMULTX_OK_\u5DF2\u62E6\u622A"');

  // ======== 精准替换空数组（HAR真实就是 "vip_info_list":[] / "permission_list":[]）========
  body = body.replace(/"vip_info_list"\s*:\s*\[\s*\]/g, '"vip_info_list":[' + VIP_ITEM + ']');
  body = body.replace(/"permission_list"\s*:\s*\[\s*\]/g, '"permission_list":' + PERMS);

  $done({ body });
}
else if (typeof $request != 'undefined' && $request.body && $request.url.indexOf('/infoc/events') != -1) {
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
