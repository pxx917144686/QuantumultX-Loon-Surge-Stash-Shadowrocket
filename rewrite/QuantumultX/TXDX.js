/*
图像大小 Apple商店:https://apps.apple.com/us/app/%E5%9B%BE%E5%83%8F%E5%A4%A7%E5%B0%8F/id670766542?l=zh-Hans-CN
[rewrite_local]
^https?:\/\/(api|buy)\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/TXDX.js
[MITM]
hostname = lcs-mobile-cops.adobe.io
*/

let obj = JSON.parse($response.body);

// 检查是否为内购验证响应
if (obj.receipt || obj.status) {
    obj = {
        "status": 0,
        "environment": "Production",
        "receipt": {
            "receipt_type": "Production",
            "app_item_id": 670766542,
            "bundle_id": "vsmedia.de.imagesize",
            "original_purchase_date": "2023-01-01 00:00:00 Etc\\/GMT",
            "in_app": [{
                "quantity": "1",
                "product_id": "vsmedia.de.imagesize.premium",
                "transaction_id": "1000000000000000",
                "original_transaction_id": "1000000000000000",
                "purchase_date": "2023-01-01 00:00:00 Etc\\/GMT",
                "purchase_date_ms": "1640995200000",
                "original_purchase_date": "2023-01-01 00:00:00 Etc\\/GMT",
                "original_purchase_date_ms": "1640995200000",
                "expires_date": "2099-01-01 00:00:00 Etc\\/GMT",
                "expires_date_ms": "4070908800000",
                "web_order_line_item_id": "1000000000000000",
                "is_trial_period": "false",
                "is_in_intro_offer_period": "false"
            }]
        },
        "latest_receipt_info": [{
            "quantity": "1",
            "product_id": "vsmedia.de.imagesize.premium",
            "transaction_id": "1000000000000000",
            "original_transaction_id": "1000000000000000",
            "purchase_date": "2023-01-01 00:00:00 Etc\\/GMT",
            "purchase_date_ms": "1640995200000",
            "original_purchase_date": "2023-01-01 00:00:00 Etc\\/GMT",
            "original_purchase_date_ms": "1640995200000",
            "expires_date": "2099-01-01 00:00:00 Etc\\/GMT",
            "expires_date_ms": "4070908800000",
            "is_trial_period": "false",
            "is_in_intro_offer_period": "false"
        }],
        "pending_renewal_info": [{
            "product_id": "vsmedia.de.imagesize.premium",
            "original_transaction_id": "1000000000000000",
            "auto_renew_product_id": "vsmedia.de.imagesize.premium",
            "auto_renew_status": "0"
        }]
    };
}

if (obj.app_info && obj.app_info.package_name === "vsmedia.de.imagesize") {
    obj.premium_access = true;
    obj.subscription_active = true;
    obj.premium_features = {
        "all_features_unlocked": true,
        "no_ads": true,
        "premium_tools": true
    };
}

$done({body: JSON.stringify(obj)});
