/*
墨迹天气
[rewrite_local]
^https?:\/\/.*\.api\.moji\.com\/(sns\/json\/profile\/get_info_.+|json\/member_new\/homepage_info.+|user\/personal\/json\/profile_.+|flycard\/novice|shortvideo\/.+) url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/mojitianqi.js

[mitm]
hostname = *.api.moji.com

*/

if ($response.body) {
    var pxx917144686 = JSON.parse($response.body);
} else {
    $done({body: $response.body});
    return;
}

const vip1 = '/sns/json/profile/get_info';
const vip2 = '/json/member_new/homepage_info';
const vip3 = '/user/personal/json/profile';
const vip4 = '/flycard/novice';
const AD1 = '/shortvideo';

// 校验字段是否存在并修改数据
if ($request.url.includes(vip1)) {
    pxx917144686.is_vip = 1;
    pxx917144686.type = 7;
    pxx917144686.grade = 1;
    pxx917144686.is_adver_free = 0;
    pxx917144686.expire_time = 4092599349000;
    pxx917144686.member_type = 1;
    pxx917144686.member_level = 1;
    pxx917144686.max_expiration_days = 9999999;
    pxx917144686.is_expire = 0;
    pxx917144686.remain_day = 9999999;
    pxx917144686.inkrity = 9999999;
    pxx917144686.status = 1;
    pxx917144686.is_purchase = true;
}

if ($request.url.includes(vip2)) {
    pxx917144686.userTips = ["将在2099-09-09到期"];
    pxx917144686.user_tips = ["将在2099-09-09到期"];
    pxx917144686.is_member = true;
    pxx917144686.user_member_info = pxx917144686.user_member_info || {};
    pxx917144686.user_member_info.vip = 1;
    pxx917144686.user_member_info.is_auto_member = 1;
}

if ($request.url.includes(vip3)) {
    pxx917144686.personal_profile = pxx917144686.personal_profile || {};
    pxx917144686.personal_profile.inkrity = 9999999;
    pxx917144686.personal_profile.is_vip = true;
    pxx917144686.personal_profile.grade = 1;
    pxx917144686.personal_profile.user_flag = true;
}

if ($request.url.includes(vip4)) {
    pxx917144686.data.novice = pxx917144686.data.novice || {};
    pxx917144686.data.novice.adShow = 0;
    pxx917144686.data.novice.expireTime = 4092599349000;
    pxx917144686.data.novice.vipShow = 1;
}

if ($request.url.includes(AD1)) {
    pxx917144686.item_list = [];
    pxx917144686.rcmList = [];
    pxx917144686.add_card_list = [];
}

$done({body: JSON.stringify(pxx917144686)});
