/*
SubPlayer 解锁Pro/永久会员 @ pxx917144686
参考：HHH.js + GTP4o.js 极简暴力风格

[rewrite_local]
^https?:\/\/meivipapi\.icewx\.com\/usermix\/user_info url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/infoc\/events url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js

[mitm]
hostname = meivipapi.icewx.com
*/

const FAR = 4092599349000;

if (typeof $response != 'undefined' && $response.body && $request.url.indexOf('/usermix/user_info') != -1) {
  let r = JSON.parse($response.body);
  if (r.data) {
    r.data.vip_info_list = [
      {
        product_id: '1000003',
        app_store_product_id: 'com.meijietech.subplayer.lifetime',
        vip_type: 3,
        sub_type: 3,
        is_diamond: true,
        is_lifetime: true,
        is_continuous: false,
        is_trial: false,
        is_active: true,
        is_expired: false,
        is_auto_renew: false,
        vip_level: 10,
        vip_name: '永久钻石会员',
        title: '永久会员',
        platform: 'ios',
        pay_platform: 'apple',
        order_id: 'SP66666666666666666666',
        start_time_ms: 1666666666000,
        expire_time_ms: FAR,
        expire_time_sec: 4092599349,
        remain_days: -1,
        expire_days: -66666,
        is_valid_user: 1,
        has_membership: true,
        has_lifetime_membership: true,
        s: 1,
        gid: 1234567890,
        membership: {
          id: '1000003',
          display_name: '永久钻石会员',
          level: 10,
          level_name: '钻石会员',
          is_lifetime: true,
          is_diamond: true
        }
      }
    ];
    r.data.permission_list = [
      { permission_id: 'subtitle_ai_generate', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'subtitle_translate', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'video_export_4k', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'subtitle_style_custom', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'no_ad', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'diamond_feature', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'background_play', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'pic_in_pic', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'subtitle_batch_export', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'cloud_sync', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'play_speed', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'pro_feature', status: 1, remain_count: -1, expire_ms: FAR },
      { permission_id: 'lifetime_feature', status: 1, remain_count: -1, expire_ms: FAR }
    ];
  }
  $done({ body: JSON.stringify(r), status: 200 });
} else if (typeof $request != 'undefined' && $request.body && $request.url.indexOf('/infoc/events') != -1) {
  let s = $request.body;
  s = s.replace(/"has_membership"\s*:\s*false/g, '"has_membership":true');
  s = s.replace(/"has_lifetime_membership"\s*:\s*false/g, '"has_lifetime_membership":true');
  s = s.replace(/"is_vip"\s*:\s*false/g, '"is_vip":true');
  s = s.replace(/"is_diamond"\s*:\s*false/g, '"is_diamond":true');
  $done({ body: s });
} else {
  $done({});
}
