/*
ProKnockOut Apple商店:https://apps.apple.com/us/app/proknockout-cut-paste-photos/id944665061
[rewrite_local]
https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/ProKnockOut.js
[MITM]
hostname = buy.itunes.apple.com
*/

let obj = JSON.parse($response.body);

// 模拟内购凭证数据
obj = {
    "status": "0",
    "receipt-data": {
        "status": 0,
        "environment": "Production",
        "receipt": {
            "receipt_type": "Production",
            "app_item_id": 944665061,
            "receipt_creation_date": "2023-08-14 15:27:40 Etc/GMT",
            "bundle_id": "com.loveyouchenapps.knockout",
            "original_purchase_date": "2023-08-14 15:27:40 Etc/GMT",
            "in_app": [{
                "quantity": "1",
                "purchase_date_ms": "1691972860000",
                "expires_date": "2222-02-02 02:02:02 Etc/GMT",
                "expires_date_ms": "7955085722000",
                "is_in_intro_offer_period": "false",
                "transaction_id": "666666666666667",
                "is_trial_period": "false",
                "original_transaction_id": "666666666666667",
                "purchase_date": "2023-08-14 15:27:40 Etc/GMT",
                "product_id": "com.knockout.SVIP.50off",
                "original_purchase_date_pst": "2023-08-14 08:27:40 America/Los_Angeles",
                "original_purchase_date_ms": "1691972861000",
                "web_order_line_item_id": "470000137081235",
                "expires_date_ms": "7955085722000",
                "purchase_date_pst": "2023-08-14 08:27:40 America/Los_Angeles",
                "original_purchase_date": "2023-08-14 15:27:40 Etc/GMT"
            }],
            "adam_id": 944665061,
            "receipt_creation_date_pst": "2023-08-14 08:27:40 America/Los_Angeles",
            "request_date": "2023-08-14 15:27:40 Etc/GMT",
            "request_date_pst": "2023-08-14 08:27:40 America/Los_Angeles",
            "version_external_identifier": 832251566,
            "request_date_ms": "1691972860000",
            "original_purchase_date_pst": "2023-08-14 08:27:40 America/Los_Angeles",
            "application_version": "5.0.0",
            "original_purchase_date_ms": "1691972860000",
            "receipt_creation_date_ms": "1691972860000",
            "original_application_version": "5.0.0",
            "download_id": 87042883772350
        },
        "latest_receipt_info": [{
            "quantity": "1",
            "purchase_date_ms": "1691972860000",
            "expires_date": "2222-02-02 02:02:02 Etc/GMT",
            "expires_date_pst": "2222-02-02 02:02:02 America/Los_Angeles",
            "is_in_intro_offer_period": "false",
            "transaction_id": "666666666666667",
            "is_trial_period": "false",
            "original_transaction_id": "666666666666667",
            "purchase_date": "2023-08-14 15:27:40 Etc/GMT",
            "product_id": "com.knockout.SVIP.50off",
            "original_purchase_date_pst": "2023-08-14 08:27:40 America/Los_Angeles",
            "subscription_group_identifier": "20461753",
            "original_purchase_date_ms": "1691972861000",
            "web_order_line_item_id": "470000137081235",
            "expires_date_ms": "7955085722000",
            "purchase_date_pst": "2023-08-14 08:27:40 America/Los_Angeles",
            "original_purchase_date": "2023-08-14 15:27:40 Etc/GMT"
        }],
        "pending_renewal_info": [{
            "product_id": "com.loveyouchenapps.knockout",
            "original_transaction_id": "666666666666667",
            "auto_renew_product_id": "com.knockout.SVIP.50off",
            "auto_renew_status": "1"
        }]
    }
};

$done({ body: JSON.stringify(obj) });
