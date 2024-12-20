/*
ProKnockOut Apple商店:https://apps.apple.com/us/app/proknockout-cut-paste-photos/id944665061
[rewrite_local]
https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/ProKnockOut.js
[MITM]
hostname = buy.itunes.apple.com
*/

const obj = JSON.parse($response.body);
const { url, headers } = $request;
const name = "ProKnockOut"; // App
const productName = "com.loveyouchenapps.knockout"; // 产品ID
const productType = "com.knockout.SVIP.50off"; // 类型
const appVersion = "5"; // 应用版本

// 判断 URL 是否为 "verifyReceipt" 请求，并且 User-Agent 是否包含 "ProKnockOut"
if (/^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt/.test(url) && headers["User-Agent"].includes(name)) {
    // 假响应数据
    obj.status = "0";
    obj.receipt_data = {
        "status": 0,
        "environment": "Production",
        "receipt": {
            "receipt_type": "Production",
            "bundle_id": productName,
            "original_purchase_date": "2023-08-14 15:27:40 Etc/GMT",
            "in_app": [{
                "quantity": "1",
                "transaction_id": "666666666666667",
                "original_transaction_id": "666666666666667",
                "product_id": productType,
                "purchase_date": "2023-08-14 15:27:40 Etc/GMT",
                "expires_date": "2222-02-02 02:02:02 Etc/GMT"
            }]
        },
        "latest_receipt_info": [{
            "quantity": "1",
            "transaction_id": "666666666666667",
            "original_transaction_id": "666666666666667",
            "product_id": productType,
            "purchase_date": "2023-08-14 15:27:40 Etc/GMT",
            "expires_date": "2222-02-02 02:02:02 Etc/GMT"
        }],
        "pending_renewal_info": [{
            "product_id": productName,
            "original_transaction_id": "666666666666667",
            "auto_renew_product_id": productType,
            "auto_renew_status": "1"
        }]
    };
}

// 返回修改后的响应
$done({ body: JSON.stringify(obj) });
