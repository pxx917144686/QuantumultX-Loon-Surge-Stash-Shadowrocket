/*
SubPlayer 解锁Pro/ @ pxx917144686

[rewrite_local]
^https?:\/\/meivipapi\.icewx\.com\/.*\/subtitle\/translate url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/.*\/subtitle\/segment\/.* url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/.*\/subtitle\/credits\/balancer url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/.*\/subtitle\/asr url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/.*\/usermix\/user_info url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/.*\/user\/info url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/.*\/refresh_token url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/api\/v1\/group\/list_group url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/.* url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js
^https?:\/\/meivipapi\.icewx\.com\/infoc\/events url script-request-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/SubPlayer.js

[mitm]
hostname = meivipapi.icewx.com
*/
try{
var N=99999999,T=4092599349000;
function p(o){if(!o||typeof o!="object")return;o.credit_balance=N;o.creditBalance=N;o.credit_points=N;o.creditPoints=N;o.credits=N;o.subtitle_points=N;o.subtitlePoints=N;o.subtitle_credit=N;o.subtitleCredit=N;o.subtitles_credits=N;o.subtitlesCredits=N;o.asr_credits=N;o.asrCredits=N;o.translate_credits=N;o.translateCredits=N;o.ai_credits=N;o.aiCredits=N;o.limit_exceeded=false;o.limitExceeded=false;o.usage_limit_exceeded=false;o.usageLimitExceeded=false;o.daily_limit_exceeded=false;o.dailyLimitExceeded=false;o.quota_exceeded=false;o.quotaExceeded=false;o.quota_used=0;o.quotaUsed=0;o.usage_used=0;o.usageUsed=0;o.remaining=N;o.remain=N;o.vip_expired=false;o.vipExpired=false;o.expired=false;o.is_expired=false;o.isExpired=false;o.expired_at=0;o.expiredAt=0;o.isLifetime=true;o.is_lifetime=true;o.hasLifetimeMembership=true;o.has_lifetime_membership=true;o.alreadyHasLifetimeMembership=true;o.already_has_lifetime_membership=true;o.is_diamond=true;o.isDiamond=true;o.vip_type=3;o.vipType=3;o.is_vip=true;o.isVip=true;o.is_member=true;o.isMember=true;o.is_pro=true;o.isPro=true;o.is_premium=true;o.isPremium=true;o.is_paid_user=true;o.isPaidUser=true;o.valid=1;o.active=true;o.expires_in=N;o.expires_at_ms=T;o.expiresAtMs=T;o.expires_at=4092599349;o.remain_day=9999999;o.remainDay=9999999;o.is_expire=0;o.isExpire=0;o.product_id="1000003";o.vip_level=3;o.level=3;o.grade=3;o.status=1}
function w(o){if(!o||typeof o!="object")return;p(o);for(var k in o){if(Array.isArray(o[k])){for(var i=0;i<o[k].length;i++)w(o[k][i])}else if(o[k]&&typeof o[k]==="object")w(o[k])}}
if(typeof $response!="undefined"&&$response.body){
var u=$request.url||"",rb=$response.body.replace(/^\ufeff/,""),o=JSON.parse(rb);
w(o);
if(u.indexOf("/subtitle/translate")>-1||u.indexOf("/segment/")>-1||u.indexOf("/asr/")>-1||u.indexOf("/subtitle/ai")>-1){o.code=0;o.status="success";o.message="success";o.msg="success";o.success=true}
if(u.indexOf("/user_info")>-1||u.indexOf("/user/info")>-1){
function n(x){if(!x||typeof x!="object")return;if(typeof x.nickname=="string")x.nickname="QX_OK_\u5DF2\u89E3\u9501";if(typeof x.user_name=="string")x.user_name="QX_OK_\u5DF2\u89E3\u9501";if(typeof x.userName=="string")x.userName="QX_OK_\u5DF2\u89E3\u9501";if(typeof x.username=="string")x.username="QX_OK_\u5DF2\u89E3\u9501";for(var k in x){if(Array.isArray(x[k])){for(var i=0;i<x[k].length;i++)n(x[k][i])}else if(x[k]&&typeof x[k]==="object")n(x[k])}}
n(o)
}
$done({body:JSON.stringify(o)})
}else if(typeof $request!="undefined"&&$request.body){
var u2=$request.url||"",b=$request.body;
if(u2.indexOf("/infoc/events")>-1){b=b.replace(/"has_membership"\s*:\s*false/g,'"has_membership":true').replace(/"has_lifetime_membership"\s*:\s*false/g,'"has_lifetime_membership":true').replace(/"already_has_lifetime_membership"\s*:\s*false/g,'"already_has_lifetime_membership":true').replace(/"requires_membership"\s*:\s*true/g,'"requires_membership":false').replace(/"subtitle_requires_membership"\s*:\s*true/g,'"subtitle_requires_membership":false').replace(/"is_diamond"\s*:\s*false/g,'"is_diamond":true').replace(/"is_vip"\s*:\s*false/g,'"is_vip":true').replace(/"vip_type"\s*:\s*\d+/g,'"vip_type":3').replace(/"limit_exceeded"\s*:\s*true/g,'"limit_exceeded":false');$done({body:b})}else{$done({})}
}else{$done({})}
}catch(e){$done({})}
