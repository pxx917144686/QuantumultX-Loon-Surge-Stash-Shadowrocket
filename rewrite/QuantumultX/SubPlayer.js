/*************************************

SubPlayer 解锁永久会员 Pro / Diamond @ pxx917144686

**************************************

[rewrite_local]
^https?:\/\/meivipapi\.icewx\.com\/usermix\/user_info url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/infoc\/events url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/paypackagebase\/list_group url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/coupon\/get_group_conf url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js

[mitm]
hostname = meivipapi.icewx.com

*************************************/

const URL_USER_INFO = '/usermix/user_info';
const URL_EVENTS = '/infoc/events';
const URL_LIST_GROUP = '/paypackagebase/list_group';
const URL_COUPON = '/coupon/get_group_conf';

const VIP_LIFETIME_PID = '1000003';
const VIP_YEARLY_PID = '1000004';
const APP_LIFETIME = 'com.meijietech.subplayer.lifetime';
const APP_YEARLY = 'com.meijietech.subplayer.yearly';

const EXPIRE_MS_FAR_FUTURE = 4092599349000;
const EXPIRE_SEC_FAR_FUTURE = 4092599349;

function buildPermissionList() {
  return [
    { permission_id: 'subtitle_ai_generate', name: 'AI字幕生成', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'subtitle_translate', name: '字幕翻译', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'video_export_4k', name: '4K导出', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'subtitle_style_custom', name: '字幕样式自定义', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'no_ad', name: '去广告', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'diamond_feature', name: '钻石功能', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'background_play', name: '后台播放', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'pic_in_pic', name: '画中画', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'subtitle_batch_export', name: '字幕批量导出', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'cloud_sync', name: '云同步', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'play_speed', name: '倍速播放', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'pro_feature', name: 'Pro功能', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE },
    { permission_id: 'lifetime_feature', name: '永久会员功能', status: 1, remain_count: -1, expire_ms: EXPIRE_MS_FAR_FUTURE }
  ];
}

function buildVipInfoList() {
  return [
    {
      vip_id: 'vip_lifetime_001',
      product_id: VIP_LIFETIME_PID,
      app_store_product_id: APP_LIFETIME,
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
      channel: 'app_store',
      order_id: 'SPLIFETIME6666666666666666',
      original_order_id: 'SPLIFETIME6666666666666666',
      start_time_ms: 1666666666000,
      start_time_sec: 1666666666,
      expire_time_ms: EXPIRE_MS_FAR_FUTURE,
      expire_time_sec: EXPIRE_SEC_FAR_FUTURE,
      first_pay_time_ms: 1666666666000,
      create_time_ms: 1666666666000,
      update_time_ms: EXPIRE_MS_FAR_FUTURE,
      valid_time_ms: EXPIRE_MS_FAR_FUTURE,
      invalid_time_ms: EXPIRE_MS_FAR_FUTURE,
      remain_days: -1,
      expire_days: -66666,
      renew_status: 1,
      business_type: 1,
      sub_biz_type: 1,
      uid_owned: true,
      has_membership: true,
      has_lifetime_membership: true,
      is_valid_user: 1,
      s: 1,
      gid: 1234567890,
      membership: {
        id: VIP_LIFETIME_PID,
        display_name: '永久钻石会员',
        level: 10,
        level_name: '钻石会员',
        is_lifetime: true,
        is_diamond: true
      }
    },
    {
      vip_id: 'vip_yearly_001',
      product_id: VIP_YEARLY_PID,
      app_store_product_id: APP_YEARLY,
      vip_type: 2,
      sub_type: 2,
      is_diamond: false,
      is_lifetime: false,
      is_continuous: true,
      is_trial: false,
      is_active: true,
      is_expired: false,
      is_auto_renew: true,
      vip_level: 5,
      vip_name: '年度会员',
      title: '一年会员',
      platform: 'ios',
      pay_platform: 'apple',
      channel: 'app_store',
      order_id: 'SPYEARLY66666666666666666',
      original_order_id: 'SPYEARLY66666666666666666',
      start_time_ms: 1666666666000,
      start_time_sec: 1666666666,
      expire_time_ms: EXPIRE_MS_FAR_FUTURE,
      expire_time_sec: EXPIRE_SEC_FAR_FUTURE,
      first_pay_time_ms: 1666666666000,
      create_time_ms: 1666666666000,
      update_time_ms: EXPIRE_MS_FAR_FUTURE,
      valid_time_ms: EXPIRE_MS_FAR_FUTURE,
      invalid_time_ms: EXPIRE_MS_FAR_FUTURE,
      remain_days: 99999,
      expire_days: 99999,
      renew_status: 2,
      business_type: 1,
      sub_biz_type: 1,
      uid_owned: true,
      has_membership: true,
      has_lifetime_membership: false,
      is_valid_user: 1,
      s: 1,
      gid: 1234567890,
      membership: {
        id: VIP_YEARLY_PID,
        display_name: '年度Pro会员',
        level: 5,
        level_name: 'Pro会员',
        is_lifetime: false,
        is_diamond: false
      }
    }
  ];
}

if (typeof $response != 'undefined' && $response.body) {
  const url = $request.url;

  if (url.indexOf(URL_USER_INFO) != -1) {
    let body;
    try {
      body = JSON.parse($response.body);
    } catch (e) {
      $done({});
      return;
    }

    if (body && body.data) {
      body.data.vip_info_list = buildVipInfoList();
      body.data.permission_list = buildPermissionList();

      if (body.data.user_info) {
        body.data.user_info.vip_type = 101;
        body.data.user_info.vip_level = 10;
        body.data.user_info.is_vip = true;
        body.data.user_info.is_diamond = true;
        body.data.user_info.is_lifetime = true;
        body.data.user_info.has_membership = true;
        body.data.user_info.has_lifetime_membership = true;
        body.data.user_info.vip_expire_at = EXPIRE_SEC_FAR_FUTURE;
        body.data.user_info.vip_expire_ms = EXPIRE_MS_FAR_FUTURE;
      }

      if (!body.resp_common) body.resp_common = {};
      body.resp_common.ret = 0;
      body.resp_common.msg = 'ok';
    }

    $done({ body: JSON.stringify(body), status: 200 });
    return;
  }

  if (url.indexOf(URL_LIST_GROUP) != -1) {
    let body;
    try {
      body = JSON.parse($response.body);
    } catch (e) {
      $done({});
      return;
    }

    if (body && body.data && body.data.pay_groups) {
      body.data.user_already_owned_lifetime = true;
      body.data.user_already_owned_pro = true;
      body.data.user_vip_type = 3;
      body.data.user_vip_level = 10;
      body.data.has_membership = true;
      body.data.has_lifetime_membership = true;
      body.data.user_active_vip = {
        product_id: VIP_LIFETIME_PID,
        is_diamond: true,
        is_lifetime: true,
        is_active: true,
        expire_time_ms: EXPIRE_MS_FAR_FUTURE
      };
    }

    $done({ body: JSON.stringify(body), status: 200 });
    return;
  }

  if (url.indexOf(URL_COUPON) != -1) {
    $done({});
    return;
  }

  $done({});
  return;
}

if (typeof $request != 'undefined' && $request.body && $request.url.indexOf(URL_EVENTS) != -1) {
  let body;
  try {
    body = JSON.parse($request.body);
  } catch (e) {
    $done({});
    return;
  }

  if (body && body.events && Array.isArray(body.events)) {
    for (let i = 0; i < body.events.length; i++) {
      const ev = body.events[i];
      if (ev.props && typeof ev.props === 'object') {
        if ('has_membership' in ev.props) {
          ev.props.has_membership = true;
        }
        if ('has_lifetime_membership' in ev.props) {
          ev.props.has_lifetime_membership = true;
        }
        if ('product_count' in ev.props) {
          ev.props.product_count = 2;
        }
        if ('is_vip' in ev.props) {
          ev.props.is_vip = true;
        }
        if ('is_diamond' in ev.props) {
          ev.props.is_diamond = true;
        }
        if ('vip_type' in ev.props) {
          ev.props.vip_type = 3;
        }
        if ('source_scene' in ev.props && ev.props.source_scene) {
          ev.props.user_has_active_membership = true;
          ev.props.user_membership_type = 'lifetime_diamond';
        }
      }
    }
  }

  $done({ body: JSON.stringify(body) });
  return;
}

$done({});
