/*************************************

美图秀秀 解锁SVIP @ pxx917144686

**************************************

[rewrite_local]
^https?:\/\/((h5|api)\.xiuxiu|api-sub|api\.posters)\.meitu\.com\/.+\/(vip|user|h\d|center|home) url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/mtxx.js
https?:\/\/api\.posters\.meitu\.com\/matting\/znxc\.json url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/mtxx.js
[mitm]
hostname = *.xiuxiu.meitu.com, api.posters.meitu.com, api-sub.meitu.com

*************************************/

var chxm1023;
try {
    chxm1023 = JSON.parse($response.body);
} catch (error) {
    console.error("Error parsing response body: ", error);
    chxm1023 = {};
}

const paths = {
    hysj: '/vip/prompt/query.json',
    hyxx: '/vip/vip_show.json',
    user: '/user/show.json',
    hyzl: '/vip/new_sub_detail.json',
    hymb: '/vip/vip_navigation.json',
    group: '/user/vip_info_by_group.json',
    vip: '/center/user_info.json',
    sjs: '/user/info_by_entrance.json',
    sjshf: '/home/home.json',
    kta: 'https://api.posters.meitu.com/center/user_rights.json',
    ktb: 'https://api.posters.meitu.com/center/user_rights_consume.json'
};

if ($request.url.indexOf(paths.hysj) !== -1) {
    chxm1023.data = {
        home_btn_prompt: "立即查看",
        if_transfer: 0,
        pay_interval: 3000,
        beautify_prompt: "",
        home_prompt: "会员有效期至2099/09/09",
        svip_bubble_text: "粉钻SVIP：有效期至2099/09/09\n粉钻VIP：有效期至2099/09/99",
        beautify_btn_prompt: "",
        request_time: 1666666666666
    };
}

if ($request.url.indexOf(paths.hyxx) !== -1) {
    chxm1023.data = {
        id: "666666666666666666",
        id_str: "666666666666666666",
        valid_time: 4092599349,
        uid: 1666666666,
        sub_type: 3,
        expire_days: -66666,
        screen_name: "",
        avatar_url: "",
        in_valid_time: 4092599349,
        gid: 1234567890,
        s: 1,
        vip_type: 101,
        platform: 2,
        sub_name: "包年",
        renew: 2,
        is_valid_user: 1,
        create_time: 1666666666,
        sub_biz_type: 1,
        is_expire: 0,
        in_valid_time: 4092599349
    };
}

if ($request.url.indexOf(paths.user) !== -1) {
    chxm1023.data = {
        ...chxm1023.data,
        vip_type: 101,
        vip_icon: "https://xximg1.meitudata.com/6948531747980333892.png",
        follower_count: 999000,
        fan_count: 999000,
        be_like_count: 999000
    };
}

if ($request.url.indexOf(paths.hyzl) !== -1) {
    chxm1023.data = {
        ...chxm1023.data,
        vip_sign_info: {
            sub_type: 3,
            renew_status: 1,
            show_auto_renew: 1,
            next_withhold_amount: 16800,
            withhold_currency_symbol: "¥",
            next_withhold_date: "2099-09-09",
            pay_channel: "苹果支付",
            do_pop_up: false
        },
        vip_power_num: 666666666666666666,
        new_power_num: 666666666666666666,
        welfare_center_num: 666666666666666666,
        exchange_vip: 0,
        platform: 2,
        renew: 1,
        is_new_vipsub: 0,
        s: 1,
        expire_days: -66666,
        sub_type: 3,
        old_vip_type: 4,
        valid_time: 4092599349,
        invalid_time: 4092599349,
        is_expire: 0,
        rights_page_vip_btn_title: "立即解锁",
        rights_page_svip_btn_title: "立即解锁",
        hbp_vip: {
            sub_type: 3,
            valid_time: 4092599349,
            renew: 1,
            expire_days: -66666,
            is_expire: 0,
            in_valid_time: 4092599349,
            s: 0
        },
        sub_biz_type: 1,
        vip_type: 101,
        xx_vip: {
            sub_type: 3,
            valid_time: 4092599349,
            renew: 1,
            expire_days: -66666,
            is_expire: 0,
            in_valid_time: 4092599349,
            s: 0
        }
    };
}

if ($request.url.indexOf(paths.hymb) !== -1) {
    chxm1023.data = {
        vip_type: 101,
        display_vip_time: 1,
        display_vip_type: 2,
        hbp_vip: {
            id: "666666666666666666",
            id_str: "666666666666666666",
            valid_time: 4092599349,
            uid: 1666666666,
            sub_type: 3,
            sub_biz_type: 1,
            avatar_url: "",
            is_expire: 0,
            expire_days: -66666,
            gid: 1234567890,
            vip_type: 101,
            platform: 2,
            sub_name: "包年",
            renew: 2,
            s: 0,
            is_valid_user: 1,
            create_time: 1666666666,
            screen_name: "",
            in_valid_time: 4092599349
        },
        xx_vip: {
            id: "666666666666666666",
            id_str: "666666666666666666",
            valid_time: 4092599349,
            uid: 1666666666,
            sub_type: 3,
            sub_biz_type: 1,
            avatar_url: "",
            is_expire: 0,
            expire_days: -66666,
            gid: 1234567890,
            vip_type: 101,
            platform: 2,
            sub_name: "包年",
            renew: 2,
            s: 0,
            is_valid_user: 1,
            create_time: 1666666666,
            screen_name: "",
            in_valid_time: 4092599349
        }
    };
}

if ($request.url.indexOf(paths.group) !== -1) {
    chxm1023.data = {
        active_sub_type: 2,
        account_type: 1,
        sub_type_name: "续期",
        active_sub_order_id: "666666666666666666",
        trial_period_invalid_time: "4092599349000",
        current_order_invalid_time: "4092599349000",
        active_order_id: "666666666666666666",
        limit_type: 0,
        active_sub_type_name: "续期",
        use_vip: true,
        have_valid_contract: false,
        derive_type_name: "普通会员",
        derive_type: 1,
        in_trial_period: true,
        is_vip: true,
        membership: {
            id: "7",
            display_name: "",
            level: 2,
            level_name: "高级会员"
        },
        active_promotion_status_list: [2, 6],
        sub_type: 3,
        account_id: "1666666666",
        invalid_time: "4092599349000",
        valid_time: "4092599349000",
        active_product_id: "0",
        active_promotion_status: 2,
        show_renew_flag: false
    };
}

if ($request.url.indexOf(paths.vip) !== -1) {
    chxm1023.data = {
        ...chxm1023.data,
        vip_end_time: 4092599349,
        is_vip: true
    };
}

if ($request.url.indexOf(paths.sjs) !== -1) {
    chxm1023.data = {
        vip_info: {
            active_sub_type: 2,
            account_type: 1,
            sub_type_name: "续期",
            active_sub_order_id: "666666666666666666",
            trial_period_invalid_time: "4092599349000",
            current_order_invalid_time: "4092599349000",
            active_order_id: "666
