/*
SubPlayer 解锁Pro/ @ pxx917144686

[rewrite_local]
^https?:\/\/meivipapi\.icewx\.com\/usermix\/user_info url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/infoc\/events url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/paypackagebase\/list_group url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js

[mitm]
hostname = meivipapi.icewx.com
*/

const EXPIRE_MS = 4092599349000;
const EXPIRE_SEC = 4092599349;
const BIG_POINTS = 999999999;

if (typeof $response != 'undefined' && $response.body && $request.url.indexOf('/usermix/user_info') != -1) {
  let r = JSON.parse($response.body);
  if (!r.data) r.data = {};
  const d = r.data;

  d.vip_info_list = [
    {
      product_id: '1000003',
      app_store_product_id: 'com.meijietech.subplayer.lifetime',
      google_product_id: '',
      microsoft_store_product_id: '',
      windows_store_product_id: '',
      play_store_product_id: '',
      vip_type: 3,
      vip_package: 'lifetime_diamond',
      vip_version: '1.0.0',
      is_diamond: true,
      is_continuous: false,
      is_default_plan: false,
      is_auto_renewing: false,
      is_family_shared: false,
      has_membership: true,
      has_lifetime_membership: true,
      already_has_lifetime_membership: true,
      account_status: 1,
      store_status: 1,
      expires_at_ms: EXPIRE_MS,
      expires_at: EXPIRE_SEC,
      expires_in: EXPIRE_SEC - 1700000000,
      created_at: 1666666666,
      created_at_ms: 1666666666000,
      updated_at: EXPIRE_SEC,
      updated_at_ms: EXPIRE_MS,
      order_id: 'SPLIFETIME6666666666666666',
      transaction_id: '470000666666666',
      original_transaction_id: '470000666666666',
      title: '永久会员',
      display_name: '遇到问题，联系pxx917144686',
      pay_platforms: ['store_link'],
      pay_type: 'apple_store',
      paywall_type: 'lifetime',
      source_scene: 'store_link_lifetime',
      default_product_id: '1000003',
      plan_type: 'lifetime',
      product_count: 1,
      ownership_type: 'purchased'
    }
  ];

  d.permission_list = [
    { permission_type: 'subtitle_ai_generate' },
    { permission_type: 'subtitle_translate' },
    { permission_type: 'video_export_4k' },
    { permission_type: 'subtitle_style_custom' },
    { permission_type: 'no_ad' },
    { permission_type: 'diamond_feature' },
    { permission_type: 'background_play' },
    { permission_type: 'pic_in_pic' },
    { permission_type: 'subtitle_batch_export' },
    { permission_type: 'cloud_sync' },
    { permission_type: 'play_speed' },
    { permission_type: 'pro_feature' },
    { permission_type: 'lifetime_feature' }
  ];

  d.user_membership = {
    vip_type: 3,
    vip_package: 'lifetime_diamond',
    has_membership: true,
    has_lifetime_membership: true,
    already_has_lifetime_membership: true,
    is_diamond: true,
    is_continuous: false,
    expires_at_ms: EXPIRE_MS,
    expires_at: EXPIRE_SEC,
    created_at: 1666666666,
    updated_at: EXPIRE_SEC,
    product_id: '1000003',
    account_status: 1,
    store_status: 1,
    blocked_membership: false
  };

  if (!d.user_info) d.user_info = {};
  d.user_info.has_membership = true;
  d.user_info.has_lifetime_membership = true;

  d.subtitle_points = BIG_POINTS;
  d.credit_points = BIG_POINTS;
  d.subtitle_credit = BIG_POINTS;
  d.credit_balance = BIG_POINTS;
  d.daily_quota_exceeded = false;
  d.subtitle_daily_limit_exceeded = false;
  d.initial_free_credits = BIG_POINTS;
  d.requires_membership = false;
  d.subtitle_requires_membership = false;

  d.subplayer_ios_default = { lifetime: true, diamond: true, pro: true };
  d.subplayer_ios_credit_default = { default_credits: BIG_POINTS, has_ai_unlimited: true };

  if (!r.resp_common) r.resp_common = {};
  r.resp_common.ret = 0;
  r.resp_common.msg = 'ok';

  $done({ body: JSON.stringify(r), status: 200 });
} else if (typeof $response != 'undefined' && $response.body && $request.url.indexOf('/paypackagebase/list_group') != -1) {
  let r = JSON.parse($response.body);
  if (!r.data) r.data = {};
  const d = r.data;
  d.has_membership = true;
  d.has_lifetime_membership = true;
  d.already_has_lifetime_membership = true;
  d.user_membership = {
    vip_type: 3,
    has_membership: true,
    has_lifetime_membership: true,
    is_diamond: true,
    expires_at_ms: EXPIRE_MS,
    product_id: '1000003'
  };
  d.subtitle_points = BIG_POINTS;
  d.credit_points = BIG_POINTS;
  d.credit_balance = BIG_POINTS;
  $done({ body: JSON.stringify(r), status: 200 });
} else if (typeof $request != 'undefined' && $request.body && $request.url.indexOf('/infoc/events') != -1) {
  let s = $request.body;
  s = s.replace(/"has_membership"\s*:\s*false/g, '"has_membership":true');
  s = s.replace(/"has_lifetime_membership"\s*:\s*false/g, '"has_lifetime_membership":true');
  s = s.replace(/"already_has_lifetime_membership"\s*:\s*false/g, '"already_has_lifetime_membership":true');
  s = s.replace(/"requires_membership"\s*:\s*true/g, '"requires_membership":false');
  s = s.replace(/"subtitle_requires_membership"\s*:\s*true/g, '"subtitle_requires_membership":false');
  s = s.replace(/"daily_quota_exceeded"\s*:\s*true/g, '"daily_quota_exceeded":false');
  s = s.replace(/"subtitle_daily_limit_exceeded"\s*:\s*true/g, '"subtitle_daily_limit_exceeded":false');
  s = s.replace(/"blocked_membership"\s*:\s*true/g, '"blocked_membership":false');
  $done({ body: s });
} else {
  $done({});
}
