/*
AI_Chatbot Apple商店：https://apps.apple.com/us/app/ai-chatbot-ai-chat-smith-4/id1559479889
[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/AI_Chatbot.js
[MITM]
hostname = buy.itunes.apple.com
*/

// 解析响应的数据
let obj = JSON.parse($response.body);

// 构造一个模拟的内购凭证数据
obj = {
    "status": "0",  // 0 表示成功
    "receipt-data": {
        "status": 0,  // 收据成功
        "environment": "Production",  // 使用环境
        "receipt": {
            "receipt_type": "Production",  // 收据
            "app_item_id": 1234567890,  // 应用 ID（请替换为实际的 app item ID）
            "bundle_id": "co.vulcanlabs.moodtracker",  // 应用的 bundle ID
            "original_purchase_date": "2024-01-01 00:00:00 Etc/GMT",  // 原始购买时间
            "in_app": [{
                "quantity": "1",  // 购买数量
                "expires_date": "2099-01-01 00:00:00 Etc/GMT",  // 永久有效期
                "transaction_id": "123456789012345",  // 交易 ID
                "product_id": "co.vulcanlabs.moodtracker.lifetime2",  // 产品 ID
            }],
        },
        "latest_receipt_info": [{
            "quantity": "1",  // 购买数量
            "expires_date": "2099-01-01 00:00:00 Etc/GMT",  // 永久有效期
            "transaction_id": "123456789012345",  // 交易 ID
            "product_id": "co.vulcanlabs.moodtracker.lifetime2",  // 产品 ID
        }],
        "pending_renewal_info": [{
            "product_id": "co.vulcanlabs.moodtracker.lifetime2",  // 产品 ID
            "auto_renew_status": "0"  // 自动续订关闭
        }]
    }
};

// 模拟的内购验证响应
$done({
    body: JSON.stringify(obj)
});
