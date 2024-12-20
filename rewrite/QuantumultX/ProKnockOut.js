/*
ProKnockOut Apple商店:https://apps.apple.com/us/app/proknockout-cut-paste-photos/id944665061
[rewrite_local]
https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/ProKnockOut.js
[MITM]
hostname = buy.itunes.apple.com
*/
let obj = JSON.parse($response.body);
let requestUrl = $request.url;
let notifyState = false;
let name = "ProKnockOut";
let productName = "com.loveyouchenapps.knockout";
let productType = "com.knockout.SVIP.50off";
let appVersion = "5";

if (/^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt?/.test(requestUrl) && $request.headers["User-Agent"].includes(name)) {
    let receipt = {
        receipt_type: "Production",
        bundle_id: productName,
        in_app: [{
            quantity: "1",
            transaction_id: "666666666666667",
            original_transaction_id: "666666666666667",
            product_id: productType,
            in_app_ownership_type: "PURCHASED",
            purchase_date: "2023-08-14 15:27:40 Etc/GMT",
            purchase_date_ms: "1691972860000",
            purchase_date_pst: "2023-08-14 08:27:40 America/Los_Angeles",
            original_purchase_date: "2023-08-14 08:24:40 Etc/GMT",
            original_purchase_date_ms: "1692026680000",
            original_purchase_date_pst: "2023-08-14 08:24:40 America/Los_Angeles",
            expires_date: "2222-02-02 02:02:02 Etc/GMT",
            expires_date_pst: "2222-02-02 02:02:02 America/Los_Angeles",
            expires_date_ms: "7955085722000",
        }],
        adam_id: 1111111111,
        receipt_creation_date_pst: "2023-08-14 08:25:04 America/Los_Angeles",
        request_date: "2023-08-14 15:27:40 Etc/GMT",
        request_date_pst: "2023-08-14 08:27:40 America/Los_Angeles",
        version_external_identifier: 666666666,
        request_date_ms: "1692026860531",
        original_purchase_date_pst: "2023-08-14 08:24:40 America/Los_Angeles",
        application_version: appVersion,
        original_purchase_date_ms: "1692026680000",
        receipt_creation_date_ms: "1691972704000",
        original_application_version: appVersion,
        download_id: 666666666666666666,
        latest_receipt_info: [{
            quantity: "1",
            transaction_id: "666666666666667",
            original_transaction_id: "666666666666667",
            product_id: productType,
            in_app_ownership_type: "PURCHASED",
            is_in_intro_offer_period: "false",
            is_trial_period: "false",
            purchase_date: "2023-08-14 15:27:40 Etc/GMT",
            purchase_date_ms: "1691972860000",
            purchase_date_pst: "2023-08-14 08:27:40 America/Los_Angeles",
            original_purchase_date: "2023-08-14 08:24:40 Etc/GMT",
            original_purchase_date_ms: "1692026680000",
            original_purchase_date_pst: "2023-08-14 08:24:40 America/Los_Angeles",
            expires_date: "2222-02-02 02:02:02 Etc/GMT",
            expires_date_pst: "2222-02-02 02:02:02 America/Los_Angeles",
            expires_date_ms: "7955085722000",
        }],
        pending_renewal_info: [{
            product_id: productName,
            original_transaction_id: "666666666666667",
            auto_renew_product_id: productType,
            auto_renew_status: "1",
        }],
        status: 0,
        environment: "Production",
    };

    obj.latest_receipt_info = receipt.latest_receipt_info;
    obj.latest_receipt = "";
    obj.pending_renewal_info = receipt.pending_renewal_info;
    obj.receipt = receipt;

    if (notifyState) {
        $notify("执行", "", "解锁成功", {
            "open-url": "404",
            "media-url": "404",
        });
    }
}

$done({
    body: JSON.stringify(obj)
});
