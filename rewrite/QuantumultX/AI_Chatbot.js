/*
# @ pxx917144686
AI_Chatbot Apple商店：https://apps.apple.com/us/app/ai-chatbot-ai-chat-smith-4/id1559479889
[rewrite_local]
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/AI_Chatbot.js
[MITM]
hostname = buy.itunes.apple.com
*/

// 初始化
var pxx917144686 = {};
var pxx = JSON.parse(typeof $response != "undefined" && $response.body || null);
var headers = {};

// 处理请求头中的 User-Agent
for (var key in $request.headers) {
  const reg = /^[a-z]+$/;
  if (key === "User-Agent" && !reg.test(key)) {
    var lowerkey = key.toLowerCase();
    $request.headers[lowerkey] = $request.headers[key];
    delete $request.headers[key];
  }
}

// 获取 User-Agent
var UA = $request.headers['user-agent'];
console.log('User-Agent:', UA); // 输出 UA 以进行调试

// 定义 User-Agent 到产品 ID 的映射
var uaProductMapping = {
  'MoodTracker': { product_id: 'co.vulcanlabs.moodtracker.lifetime2' },
  'PicPro': { product_id: 'com.quangtm193.picpro1year' }
};

// 模拟的收据数据
var receipt = {
  "quantity": "1",
  "purchase_date_ms": "1686002766000",  
  "expires_date": "2099-01-01 00:00:00 Etc/GMT",  
  "expires_date_pst": "2099-01-01 00:00:00 America/Los_Angeles",  
  "is_in_intro_offer_period": "false",  
  "transaction_id": "123456789012345",  
  "is_trial_period": "false",  
  "original_transaction_id": "123456789012345",  
  "purchase_date": "2023-06-06 06:06:06 Etc/GMT",  
  "product_id": "co.vulcanlabs.moodtracker.lifetime2",  
  "original_purchase_date_pst": "2023-06-06 06:06:06 America/Los_Angeles",  
  "in_app_ownership_type": "PURCHASED",  
  "subscription_group_identifier": "20877951",  
  "original_purchase_date_ms": "1686002766000",  
  "web_order_line_item_id": "123456789012345",  
  "expires_date_ms": "4080082256000",  
  "purchase_date_pst": "2023-06-06 06:06:06 America/Los_Angeles",  
  "original_purchase_date": "2023-06-06 06:06:06 Etc/GMT" 
};

// 定义自动续期相关数据
var renewal = {
  "expiration_intent": "1",
  "product_id": "co.vulcanlabs.moodtracker.lifetime2",  
  "is_in_billing_retry_period": "0",  
  "auto_renew_product_id": "co.vulcanlabs.moodtracker.lifetime2",  
  "original_transaction_id": "123456789012345",  
  "auto_renew_status": "0"  
};

// 根据 User-Agent 查找对应的产品ID，并返回模拟的收据信息
for (var uaKey in uaProductMapping) {
  if (UA && UA.includes(uaKey)) {
    var productInfo = uaProductMapping[uaKey];
    var product_id = productInfo.product_id;
    receipt.product_id = product_id;
    renewal.product_id = product_id;
    renewal.auto_renew_product_id = product_id;
    pxx.receipt.in_app = [receipt];
    pxx.latest_receipt_info = [receipt];
    pxx.pending_renewal_info = [renewal];
    pxx.latest_receipt = "chxm1023"; // 根据需要修改
    console.log('Matched User-Agent, modified receipt data');
    break;
  }
}

// 返回修改后的响应
pxx917144686 = pxx;
console.log('Final response body:', JSON.stringify(pxx917144686)); // 输出最终响应体以调试
$done({ body: JSON.stringify(pxx917144686) });

