/*
SubPlayer 解锁Pro/ @ pxx917144686

[rewrite_local]
^https?:\/\/meivipapi\.icewx\.com\/usermix\/user_info url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/infoc\/events url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js

[mitm]
hostname = meivipapi.icewx.com
*/


const VIP_ITEM = {
  product_id: "1000003",
  app_store_product_id: "com.meijietech.subplayer.lifetime",
  microsoft_store_product_id: "9PPSLR8BM021",
  google_play_product_id: "com.meijietech.subplayer.lifetime",
  default_product_id: "1000003",
  vip_type: 3, type: 3, level: 3, grade: 3, vip_level: 3,
  is_diamond: true, isDiamond: true,
  has_membership: true, hasMembership: true,
  has_lifetime_membership: true, hasLifetimeMembership: true,
  already_has_lifetime_membership: true, alreadyHasLifetimeMembership: true,
  is_continuous: false, is_vip: true, isVip: true,
  is_member: true, isMember: true,
  is_pro: true, isPro: true,
  is_premium: true, isPremium: true,
  is_paid_user: true, isPaidUser: true,
  is_lifetime: true, isLifetime: true,
  valid: 1, status: 1, active: true,
  expires_at_ms: 4092599349000, expiresAtMs: 4092599349000,
  expires_at: 4092599349, expiresAt: 4092599349,
  expiry_ms: 4092599349000, expiryMs: 4092599349000,
  expire_time_ms: 4092599349000, expireTimeMs: 4092599349000,
  expire_time: 4092599349, expireTime: 4092599349,
  expires_in: 999999999, expiresIn: 999999999,
  remain_day: 9999999, remainDay: 9999999,
  is_expire: 0, isExpire: 0, is_expired: false, isExpired: false,
  created_at_ms: 1666666666000, createdAtMs: 1666666666000,
  created_at: 1666666666, createdAt: 1666666666,
  order_id: "SPLIFETIME6666666666666666",
  orderId: "SPLIFETIME6666666666666666",
  transaction_id: "SPLIFETIMETXN666666666",
  transactionId: "SPLIFETIMETXN666666666"
};

const PERMS = [
  { permission_type: "subtitle_generate", permissionType: "subtitle_generate", type: "subtitle_generate" },
  { permission_type: "subtitle_translate", permissionType: "subtitle_translate", type: "subtitle_translate" },
  { permission_type: "subtitle_asr",      permissionType: "subtitle_asr",      type: "subtitle_asr" },
  { permission_type: "adblock",            permissionType: "adblock",            type: "adblock" },
  { permission_type: "subtitle",           permissionType: "subtitle",           type: "subtitle" },
  { permission_type: "diamond",            permissionType: "diamond",            type: "diamond" },
  { permission_type: "pro",                permissionType: "pro",                type: "pro" },
  { permission_type: "ai_subtitle",        permissionType: "ai_subtitle",        type: "ai_subtitle" }
];

const CREDITS_PATCH = {
  credit_balance: 99999999, creditBalance: 99999999,
  credit_points:  99999999, creditPoints:  99999999,
  credits:        99999999,
  subtitle_points: 99999999, subtitlePoints: 99999999,
  subtitle_credit: 99999999, subtitleCredit: 99999999,
  subtitles_credits: 99999999, subtitlesCredits: 99999999,
  asr_credits: 99999999, asrCredits: 99999999,
  translate_credits: 99999999, translateCredits: 99999999,
  ai_credits: 99999999, aiCredits: 99999999,
  limit_exceeded: false, limitExceeded: false,
  usage_limit_exceeded: false, usageLimitExceeded: false,
  daily_limit_exceeded: false, dailyLimitExceeded: false,
  quota_exceeded: false, quotaExceeded: false,
  quota_used: 0, quotaUsed: 0,
  usage_used: 0, usageUsed: 0,
  remaining: 99999999, remain: 99999999,
  vip_expired: false, vipExpired: false,
  expired: false, is_expired: false, isExpired: false,
  expired_at: 0, expiredAt: 0,
  isLifetime: true, is_lifetime: true,
  hasLifetimeMembership: true, has_lifetime_membership: true,
  alreadyHasLifetimeMembership: true, already_has_lifetime_membership: true,
  is_diamond: true, isDiamond: true,
  vip_type: 3, vipType: 3, type: 3, grade: 3, level: 3, vip_level: 3,
  is_vip: true, isVip: true,
  is_member: true, isMember: true,
  is_pro: true, isPro: true,
  is_premium: true, isPremium: true,
  is_paid_user: true, isPaidUser: true,
  valid: 1, status: 1, active: true,
  expires_at_ms: 4092599349000, expiresAtMs: 4092599349000,
  expire_time_ms: 4092599349000, expireTimeMs: 4092599349000,
  expire_time: 4092599349, expireTime: 4092599349,
  expires_in: 999999999, expiresIn: 999999999,
  remain_day: 9999999, remainDay: 9999999,
  is_expire: 0, isExpire: 0
};

function patchDeep(obj, patchBag, depth) {
  if (!obj || typeof obj !== "object") return obj;
  if (!depth) depth = 0;
  if (depth > 8) return obj;
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) obj[i] = patchDeep(obj[i], patchBag, depth + 1);
    return obj;
  }

  for (var k in patchBag) {
    if (patchBag.hasOwnProperty(k)) obj[k] = patchBag[k];
  }

  var standardNodes = ["data","user","membership","credits","account","subscription",
                       "vip_info","vipInfo","status","info","detail","result","payload",
                       "user_info","userInfo","currentUser","profile","me"];
  for (var j = 0; j < standardNodes.length; j++) {
    var nk = standardNodes[j];
    if (obj[nk] && typeof obj[nk] === "object") {
      for (var pk in patchBag) {
        if (patchBag.hasOwnProperty(pk)) obj[nk][pk] = patchBag[pk];
      }
    }
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] && typeof obj[key] === "object") {
      obj[key] = patchDeep(obj[key], patchBag, depth + 1);
    }
  }
  return obj;
}


var url = $request.url || "";

if (typeof $request !== "undefined" && typeof $response === "undefined") {
  if (url.indexOf("/infoc/events") !== -1 && $request.body) {
    var rb = $request.body;
    rb = rb.replace(/"has_membership"\s*:\s*false/g,       '"has_membership":true');
    rb = rb.replace(/"has_lifetime_membership"\s*:\s*false/g,'"has_lifetime_membership":true');
    rb = rb.replace(/"already_has_lifetime_membership"\s*:\s*false/g,'"already_has_lifetime_membership":true');
    rb = rb.replace(/"requires_membership"\s*:\s*true/g,    '"requires_membership":false');
    rb = rb.replace(/"subtitle_requires_membership"\s*:\s*true/g,'"subtitle_requires_membership":false');
    rb = rb.replace(/"is_diamond"\s*:\s*false/g,            '"is_diamond":true');
    rb = rb.replace(/"is_vip"\s*:\s*false/g,                '"is_vip":true');
    rb = rb.replace(/"vip_type"\s*:\s*\d+/g,                '"vip_type":3');
    rb = rb.replace(/"limit_exceeded"\s*:\s*true/g,         '"limit_exceeded":false');
    $done({ body: rb });
  } else {
    $done({});
  }
}

else if (typeof $response !== "undefined" && $response.body) {
  var body = $response.body;


  if (url.indexOf("/usermix/user_info") !== -1 || url.indexOf("/user/info") !== -1 || url.indexOf("/user_info") !== -1 || url.indexOf("/me") !== -1) {
    body = body.replace(/"nickname"\s*:\s*"[^"]*"/g,          '"nickname":"QX_OK_\u5DF2\u89E3\u9501"');
    body = body.replace(/"user_name"\s*:\s*"[^"]*"/g,         '"user_name":"QX_OK_\u5DF2\u89E3\u9501"');
    body = body.replace(/"userName"\s*:\s*"[^"]*"/g,          '"userName":"QX_OK_\u5DF2\u89E3\u9501"');
    body = body.replace(/"username"\s*:\s*"[^"]*"/g,          '"username":"QX_OK_\u5DF2\u89E3\u9501"');
    body = body.replace(/"vip_info_list"\s*:\s*\[\s*\]/g,     '"vip_info_list":[' + JSON.stringify(VIP_ITEM) + ']');
    body = body.replace(/"vipInfoList"\s*:\s*\[\s*\]/g,       '"vipInfoList":['     + JSON.stringify(VIP_ITEM) + ']');
    body = body.replace(/"membership_list"\s*:\s*\[\s*\]/g,   '"membership_list":[' + JSON.stringify(VIP_ITEM) + ']');
    body = body.replace(/"subscriptions"\s*:\s*\[\s*\]/g,     '"subscriptions":['   + JSON.stringify(VIP_ITEM) + ']');
    body = body.replace(/"order_list"\s*:\s*\[\s*\]/g,        '"order_list":['      + JSON.stringify(VIP_ITEM) + ']');
    body = body.replace(/"permission_list"\s*:\s*\[\s*\]/g,   '"permission_list":'  + JSON.stringify(PERMS));
    body = body.replace(/"permissions"\s*:\s*\[\s*\]/g,       '"permissions":'      + JSON.stringify(PERMS));
    body = body.replace(/"permissionList"\s*:\s*\[\s*\]/g,    '"permissionList":'   + JSON.stringify(PERMS));
    var obj1 = JSON.parse(body);
    patchDeep(obj1, CREDITS_PATCH, 0);
    $done({ body: JSON.stringify(obj1) });
  }

  else if (url.indexOf("/subtitle/credits/balancer") !== -1 ||
           url.indexOf("/subtitle/credits") !== -1 ||
           url.indexOf("/credits/") !== -1 ||
           url.indexOf("/balance") !== -1 ||
           url.indexOf("/quota") !== -1) {
    var objC = JSON.parse(body);
    if (objC.data && typeof objC.data === "object") {
      for (var kC in CREDITS_PATCH) {
        if (CREDITS_PATCH.hasOwnProperty(kC)) objC.data[kC] = CREDITS_PATCH[kC];
      }
    }
    patchDeep(objC, CREDITS_PATCH, 0);
    $done({ body: JSON.stringify(objC) });
  }
  else if (url.indexOf("/account/compatible/refresh_token") !== -1 ||
           url.indexOf("/refresh_token") !== -1 ||
           url.indexOf("/auth/login") !== -1 ||
           url.indexOf("/auth/refresh") !== -1 ||
           url.indexOf("/login") !== -1 ||
           url.indexOf("/token") !== -1) {
    var objD = JSON.parse(body);
    ["data","user","account","profile"].forEach(function(node){
      if (objD[node] && typeof objD[node] === "object") {
        for (var kd in CREDITS_PATCH) {
          if (CREDITS_PATCH.hasOwnProperty(kd)) objD[node][kd] = CREDITS_PATCH[kd];
        }
      }
    });
    patchDeep(objD, CREDITS_PATCH, 0);
    $done({ body: JSON.stringify(objD) });
  }

  else if (url.indexOf("/subtitle/translate") !== -1 ||
           url.indexOf("/subtitle/segment/create") !== -1 ||
           url.indexOf("/segment/") !== -1 ||
           url.indexOf("/asr/") !== -1 ||
           url.indexOf("/ai/") !== -1) {
    var objE = JSON.parse(body);
    patchDeep(objE, CREDITS_PATCH, 0);
    objE.code = 0;
    objE.status = "success";
    objE.message = "success";
    objE.msg = "success";
    objE.success = true;
    $done({ body: JSON.stringify(objE) });
  }

  else {
    try {
      var objF = JSON.parse(body);
      patchDeep(objF, CREDITS_PATCH, 0);
      $done({ body: JSON.stringify(objF) });
    } catch (e) {
      $done({});
    }
  }
}
else {
  $done({});
}
