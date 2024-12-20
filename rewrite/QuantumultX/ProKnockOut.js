/*
ProKnockOut Apple商店:https://apps.apple.com/us/app/proknockout-cut-paste-photos/id944665061
[rewrite_local]
https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/ProKnockOut.js
[MITM]
hostname = buy.itunes.apple.com
*/

const obj = JSON.parse($response.body);
const { url, headers } = $request;
const name = "ProKnockOut";
const productName = "com.loveyouchenapps.knockout";
const productType = "com.knockout.SVIP.50off";
const appVersion = "5";

if (/^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt/.test(url) && headers["User-Agent"].includes(name)) {
    const receipt = {
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
            expires_date: "2222-02-02 02:02:02 Etc/GMT",
            expires_date_ms: "7955085722000",
        }],
        adam_id: 1111111111,
        receipt_creation_date_pst: "2023-08-14 08:25:04 America/Los_Angeles",
        application_version: appVersion,
        latest_receipt_info: [{
            quantity: "1",
            transaction_id: "666666666666667",
            original_transaction_id: "666666666666667",
            product_id: productType,
            in_app_ownership_type: "PURCHASED",
            expires_date: "2222-02-02 02:02:02 Etc/GMT",
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
}

$done({ body: JSON.stringify(obj) });
