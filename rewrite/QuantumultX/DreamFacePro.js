/*
******************************************
 * DreamFacePro Crack
 * pxx917144686
 * Apple Store: https://apps.apple.com/us/app/dreamface-ai-video-generator/id1624172324
 ******************************************

[rewrite_local]
^https?:\/\/dreamfaceapp\.com\/df-server\/user\/save_user_login$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/DreamFacePro.js

[mitm]
hostname = dreamfaceapp.com
******************************************
*/

// Base64 编码字符数组
const BASE64_CHARS = [
    "dmlwX3Byb2R1Y3RfaWQ=", // "vip_product_id"
    "c3RyaW5naWZ5",         // "stringify"
    "cGFyc2U=",             // "parse"
    "Ym9keQ==",             // "body"
    "ZGF0YQ==",             // "data"
    "cmlnaHRz",             // "rights"
    "cmVuZXdhbA==",        // "renewal"
    "dmlwX3R5cGU=",         // "vip_type"
    "dmlwX2xhYmVs",         // "vip_label"
    "dmlwX3JlbWFpbmRlcl9kYXk=", // "vip_reminder_day"
    "ZXhwaXJlc19kYXRl",     // "expires_date"
    "aGF2ZV90cmlhbA==",     // "have_trial"
    "ZXhwaXJlc19kYXRlX2Zvcm1hdA==", // "expires_date_format"
    "Mjk5OS0xMi0yOCAwOTowMDowMC4wMDA=" // "2999-12-28 09:00:00.000"
];

// 解码 Base64 字符串
const decodeBase64 = (encodedStr) => {
    return atob(encodedStr)
        .split("")
        .map(char => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("");
};

// 获取解码后的字符串
const decode = (index) => {
    let decodedStr = BASE64_CHARS[index];
    return decodeBase64(decodedStr);
};

// 修改响应体
const modifyResponse = (responseBody) => {
    try {
        const response = JSON.parse(responseBody);

        response.data = {
            rights: {
                renewal: true,
                vip_type: "YEAR",
                vip_label: "Pro Membership",
                vip_reminder_day: 999999,
                expires_date: "2099-12-28T09:00:00.000Z",
                have_trial: false,
                expires_date_format: "2099-12-28 09:00:00"
            }
        };

        return JSON.stringify(response);

    } catch (error) {
        console.error("Error modifying response", error);
        return responseBody; // Return original response in case of error
    }
};

// 处理并返回修改后的响应
const updatedResponse = modifyResponse($response.body);
$done({ body: updatedResponse });
