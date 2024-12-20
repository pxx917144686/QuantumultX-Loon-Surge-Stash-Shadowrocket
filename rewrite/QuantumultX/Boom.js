/*
Boom Apple商店:https://apps.apple.com/us/app/boom-bass-booster-equalizer/id1065511007
[rewrite_local]
^https:\/\/apimboom2\.globaldelight\.net\/itunesreceipt_v2\.php$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/Boom.js
[MITM]
hostname = apimboom2.globaldelight.net
*/

const obj = JSON.parse($response.body);
const { url, headers } = $request;

// 判断
const name = "Boom";  // 产品名称
const productName = "com.globaldelight.iBoom";  // 产品ID
const productType = "com.globaldelight.iBoom.LifetimeDiscountPack";  // 内购类型
const appVersion = "4191";  // 应用版本

// 如果请求符合,修改返回数据
if (/^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt/.test(url) && headers["User-Agent"].includes(name)) {
    const receipt = {
        receipt_type: "Production",
        bundle_id: productName,
        in_app: [{
            quantity: "1",
            transaction_id: "470000445785125",
            original_transaction_id: "470000445785125",
            product_id: productType,
            in_app_ownership_type: "PURCHASED",
            purchase_date: "2019-04-17 04:10:56 Etc/GMT",
            purchase_date_ms: "1555474256000",
            expires_date: "2099-04-17 04:10:56 Etc/GMT",
            expires_date_ms: "1587096656000",
        }],
        adam_id: 1065511007,
        receipt_creation_date_pst: "2019-10-30 09:52:23 America/Los_Angeles",
        application_version: appVersion,
        latest_receipt_info: [{
            quantity: "1",
            transaction_id: "470000445785125",
            original_transaction_id: "470000445785125",
            product_id: productType,
            in_app_ownership_type: "PURCHASED",
            expires_date: "2099-04-17 04:10:56 Etc/GMT",
            expires_date_ms: "1587096656000",
        }],
        pending_renewal_info: [{
            product_id: productName,
            original_transaction_id: "470000445785125",
            auto_renew_product_id: productType,
            auto_renew_status: "0",
        }],
        status: 0,
        environment: "Production",
    };

    // 直接替换响应数据
    obj.latest_receipt_info = receipt.latest_receipt_info;
    obj.latest_receipt = "";
    obj.pending_renewal_info = receipt.pending_renewal_info;
    obj.receipt = receipt;
}

// 返回修改后的响应
$done({ body: JSON.stringify(obj) });
