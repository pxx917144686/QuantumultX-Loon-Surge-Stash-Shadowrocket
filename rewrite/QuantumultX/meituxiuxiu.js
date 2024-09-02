/*
#美图秀秀_粉钻会员 @ pxx917144686


【QuantumultX】
[rewrite_local]
^https?://(api|h5).xiuxiu.meitu.com/(?!(v\d/feed/|v\d/search/|v\d/channel/)) url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/meituxiuxiu.js

[MITM]
hostname: api.xiuxiu.meitu.com, h5.xiuxiu.meitu.com

************************************************

【Surge】
[Script]
美图秀秀 = type=http-response,requires-body=1,max-size=0,pattern=^https?://(api|h5).xiuxiu.meitu.com/(?!(v\d/feed/|v\d/search/|v\d/channel/)),script-path=https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/meituxiuxiu.js

[MITM]
hostname: api.xiuxiu.meitu.com, h5.xiuxiu.meitu.com

*/

(function() {
    const response = $response.body;
    let data;

    try {
        data = JSON.parse(response);
    } catch (e) {
        console.error("Failed to parse response body:", e);
        $done({ body: response });
        return;
    }

    if (data && data.data) {
        const now = Math.floor(Date.now() / 1000); // Current Unix timestamp
        data.data = {
            ...data.data,
            vip_type: 1,
            expire_days: -9999999999,
            is_expire: 0,
            in_valid_time: 5576488923,
            is_valid_user: 1,
            valid_time: 5576488923,
            home_prompt: "粉钻会员 2030年1月1日到期",
            home_btn_prompt: "已解锁",
        };
        $done({ body: JSON.stringify(data) });
    } else {
        console.warn("Unexpected response structure:", data);
        $done({ body: response });
    }
})();
