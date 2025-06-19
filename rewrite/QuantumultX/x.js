/**
 * 有问题 联系 pxx917144686
 */


[rewrite_local]
# Apple官方验证
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/x.js

# RevenueCat验证 - 请求和响应都处理
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/x.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/x.js

# Paddle验证
^https?:\/\/v3\.paddleapi\.com\/3\.2\/license\/(verify|activate) url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/x.js

# 通用验证端点
^https?:\/\/.*\/(verify|validate|receipt|subscription)($|\/) url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/x.js

[mitm]
hostname = buy.itunes.apple.com, api.revenuecat.com, api.rc-backup.com, v3.paddleapi.com



/**
 * 智能侦测器
 * 分析JSON响应，自动判断是否为内购验证相关内容
 */

(function() {
  const $ = {};
  $.response = $response;
  $.request = $request;
  $.done = (obj) => $done(obj);
  
  // 仅处理JSON响应
  const contentType = $.response.headers['Content-Type'] || $.response.headers['content-type'] || '';
  if (!contentType.includes('json') && !contentType.includes('javascript')) {
    return $.done({});
  }
  
  try {
    // 解析响应体
    const body = JSON.parse($.response.body || '{}');
    
    // 内购相关关键字列表
    const subscriptionKeywords = [
      'subscript', 'premium', 'vip', 'plus', 'pro', 'expire', 'trial', 'member',
      'active', 'status', 'valid', 'unlock', 'receipt', 'purchase', 'transaction',
      'entitlement', 'account_type', 'access', 'level', 'plan', 'billing', 'tier'
    ];
    
    // 分析响应体中是否包含相关关键字
    const bodyStr = JSON.stringify(body).toLowerCase();
    const isPossibleSubscription = subscriptionKeywords.some(keyword => 
      bodyStr.includes(keyword.toLowerCase())
    );
    
    // 如果是可能的订阅内容，添加特殊标记转发给主脚本处理
    if (isPossibleSubscription) {
      console.log(`[SatellaJailed_Detector] 检测到可能的内购验证响应: ${$.request.url}`);
      
      // 添加自定义标记
      body['_SatellaDetected'] = true;
      
      // 返回已标记的响应体，让主脚本进一步处理
      const modifiedBody = JSON.stringify(body);
      
      // 调用主处理脚本
      return $.done({
        body: modifiedBody,
        headers: {
          'X-SatellaJailed-Detector': 'DETECTED'
        }
      });
    }
  } catch (e) {
    console.log(`[SatellaJailed_Detector] 解析错误: ${e}`);
  }
  
  // 不是内购验证相关的响应，保持原样
  return $.done({});
})();










/**
 * SatellaJailed超级版
 * 全网内购验证智能拦截处理系统
 */

(function() {
  const $ = {};
  $.response = $response;
  $.request = $request;
  $.done = (obj) => $done(obj);
  
  // 请求和响应信息
  const url = $.request.url;
  const method = $.request.method || "GET";
  const headers = $.request.headers || {};
  const ua = headers['User-Agent'] || headers['user-agent'] || '';
  
  // 解析响应体
  let body;
  try {
    body = JSON.parse($.response.body || '{}');
  } catch (e) {
    // 非JSON响应
    console.log(`[SatellaJailed] 非JSON响应或解析失败: ${e}`);
    return $.done({});
  }
  
  // 检查是否是侦测器转发的请求
  const isDetected = headers['X-SatellaJailed-Detector'] === 'DETECTED' || body['_SatellaDetected'] === true;
  if (body['_SatellaDetected']) delete body['_SatellaDetected'];
  
  console.log(`[SatellaJailed] 处理请求: ${url.substring(0, 100)}...`);
  if (isDetected) {
    console.log(`[SatellaJailed] 来源: 侦测器转发`);
  }
  
  // 自动识别端点类型
  function identifyEndpointType() {
    // Apple验证
    if (url.includes('buy.itunes.apple.com/verifyReceipt')) {
      return 'APPLE';
    }
    
    // RevenueCat验证
    if (url.includes('api.revenuecat.com') || url.includes('api.rc-backup.com')) {
      return 'REVENUECAT';
    }
    
    // Paddle验证
    if (url.includes('paddle') && (url.includes('/verify') || url.includes('/license/') || url.includes('/order'))) {
      return 'PADDLE';
    }
    
    // 检查URL路径关键字
    const urlPathKeywords = [
      'verify', 'validate', 'receipt', 'subscription', 'purchase', 'transaction'
    ];
    
    for (const keyword of urlPathKeywords) {
      if (url.includes(`/${keyword}`) || url.includes(`/${keyword}s`)) {
        return 'KEYWORD_MATCH';
      }
    }
    
    // 深入分析响应结构
    return analyzeResponseStructure(body);
  }
  
  // 深度分析响应结构，猜测验证类型
  function analyzeResponseStructure(responseBody) {
    // 检查Apple收据特征
    if (responseBody.receipt || responseBody.status !== undefined || responseBody.latest_receipt) {
      return 'APPLE';
    }
    
    // 检查RevenueCat特征
    if (responseBody.subscriber || responseBody.entitlements || 
        (responseBody.offerings && responseBody.products)) {
      return 'REVENUECAT';
    }
    
    // 检查常见订阅响应模式
    if (responseBody.subscription || responseBody.subscriptions || 
        responseBody.premium !== undefined || responseBody.is_premium !== undefined ||
        responseBody.active !== undefined || responseBody.isActive !== undefined ||
        responseBody.pro !== undefined || responseBody.isPro !== undefined) {
      return 'SUBSCRIPTION';
    }
    
    return 'GENERIC';
  }
  
  // 提取应用标识
  function extractAppInfo() {
    // 从响应中提取
    const bundleId = body.receipt?.bundle_id || body.receipt?.Bundle_Id || '';
    
    // 从URL中提取可能的应用标识
    const urlMatches = url.match(/\/([a-zA-Z][a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_\.]+)\//);
    const urlBundleId = urlMatches ? urlMatches[1] : '';
    
    // 从UA中提取
    const uaMatches = ua.match(/([a-zA-Z][a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_\.]+)/);
    const uaBundleId = uaMatches ? uaMatches[1] : '';
    
    return bundleId || urlBundleId || uaBundleId || generateRandomBundleId();
  }
  
  // 生成随机应用标识（当无法提取时使用）
  function generateRandomBundleId() {
    const prefixes = ['com', 'org', 'net', 'io'];
    const names = ['app', 'service', 'tool', 'studio', 'dev'];
    const products = ['pro', 'plus', 'premium', 'vip', 'subscription'];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    
    return `${prefix}.${name}.${product}`;
  }
  
  // 日期处理函数
  const now = new Date();
  const expiration = new Date('2099-09-09');
  
  function formatDate(date) {
    return date.toISOString().replace('T', ' ').split('.')[0] + ' Etc/GMT';
  }
  
  function formatPSTDate(date) {
    const pstDate = new Date(date.getTime() - 7*60*60*1000);
    return pstDate.toISOString().replace('T', ' ').split('.')[0] + ' America/Los_Angeles';
  }
  
  // 生成唯一ID
  function generateTransactionId() {
    return Math.floor(Math.random() * 900000000000000) + 100000000000000;
  }
  
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    }).toUpperCase();
  }
  
  // 处理Apple收据验证
  function handleAppleValidation() {
    const bundleId = extractAppInfo();
    console.log(`[SatellaJailed] 处理Apple验证, bundleId: ${bundleId}`);
    
    // 确定产品ID
    function determineProductId() {
      // 从原始收据中提取
      if (body.receipt?.in_app?.length > 0 && body.receipt.in_app[0].product_id) {
        return body.receipt.in_app[0].product_id;
      }
      
      // 构建可能的产品ID
      const suffixes = ['yearly', 'annual', 'year', 'lifetime', 'forever', 'premium', 'pro', 'plus', 'monthly', 'weekly', 'unlock', 'vip'];
      for (const suffix of suffixes) {
        const possibleId = `${bundleId}.${suffix}`;
        console.log(`[SatellaJailed] 尝试产品ID: ${possibleId}`);
        return possibleId;
      }
      
      return `${bundleId}.pro`;
    }
    
    const productId = determineProductId();
    const transactionId = generateTransactionId().toString();
    
    // 构建收据项
    const receiptItem = {
      "quantity": "1",
      "product_id": productId,
      "transaction_id": transactionId,
      "original_transaction_id": transactionId,
      "purchase_date": formatDate(now),
      "purchase_date_ms": now.getTime().toString(),
      "purchase_date_pst": formatPSTDate(now),
      "original_purchase_date": formatDate(now),
      "original_purchase_date_ms": now.getTime().toString(),
      "original_purchase_date_pst": formatPSTDate(now),
      "expires_date": formatDate(expiration),
      "expires_date_ms": expiration.getTime().toString(),
      "expires_date_pst": formatPSTDate(expiration),
      "web_order_line_item_id": generateTransactionId().toString(),
      "is_trial_period": "false",
      "is_in_intro_offer_period": "false",
      "in_app_ownership_type": "PURCHASED"
    };
    
    // 构建响应对象
    body.status = 0;
    body.receipt = body.receipt || {};
    body.receipt.bundle_id = bundleId;
    body.receipt.application_version = "1.0";
    body.receipt.in_app = [receiptItem];
    body.latest_receipt_info = [receiptItem];
    body.latest_receipt = "MIIUHAYJKoZIhvcNAQcCoIIUDTCCFAkCAQExCzAJBgUrDgMCGgUAMIIDvQYJKoZIhvcN..." + 
                          Math.random().toString(36).substring(2, 15);
    body.pending_renewal_info = [{
      "product_id": productId,
      "original_transaction_id": receiptItem.original_transaction_id,
      "auto_renew_product_id": productId,
      "auto_renew_status": "1"
    }];
    
    console.log(`[SatellaJailed] Apple验证处理完成`);
  }
  
  // 处理RevenueCat验证
  function handleRevenueCatValidation() {
    const bundleId = extractAppInfo();
    console.log(`[SatellaJailed] 处理RevenueCat验证, bundleId: ${bundleId}`);
    
    // 判断请求类型
    if (url.includes('/v1/receipts') || url.includes('/receipts')) {
      // 收据验证请求
      body.subscriber = body.subscriber || {};
      body.subscriber.subscriptions = body.subscriber.subscriptions || {};
      body.subscriber.entitlements = body.subscriber.entitlements || {};
      
      // 提取或生成产品ID
      let productIds = [];
      
      // 从现有订阅中提取
      if (Object.keys(body.subscriber.subscriptions).length > 0) {
        productIds = Object.keys(body.subscriber.subscriptions);
      } else {
        // 生成可能的产品ID
        productIds = [`${bundleId}.pro`];
      }
      
      // 更新每个订阅
      productIds.forEach(productId => {
        body.subscriber.subscriptions[productId] = {
          "purchase_date": now.toISOString(),
          "expires_date": expiration.toISOString(),
          "is_sandbox": false,
          "original_purchase_date": now.toISOString(),
          "period_type": "normal",
          "ownership_type": "PURCHASED",
          "store": "app_store",
          "unsubscribe_detected_at": null
        };
      });
      
      // 更新每个权益
      const entitlementIds = Object.keys(body.subscriber.entitlements).length > 0 
                           ? Object.keys(body.subscriber.entitlements)
                           : ['pro', 'premium', 'vip', 'plus'];
      
      entitlementIds.forEach(entitlementId => {
        body.subscriber.entitlements[entitlementId] = {
          "expires_date": expiration.toISOString(),
          "product_identifier": productIds[0],
          "purchase_date": now.toISOString()
        };
      });
    }
    else if (url.includes('/v1/subscribers/') || url.includes('/subscribers/')) {
      // 订阅者请求
      body.subscriber = body.subscriber || {};
      body.subscriber.subscriptions = body.subscriber.subscriptions || {};
      body.subscriber.entitlements = body.subscriber.entitlements || {};
      body.subscriber.first_seen = now.toISOString();
      body.subscriber.original_app_user_id = body.subscriber.original_app_user_id || generateUUID();
      body.subscriber.non_subscriptions = body.subscriber.non_subscriptions || {};
      
      // 添加默认订阅
      const defaultProductId = `${bundleId}.pro`;
      body.subscriber.subscriptions[defaultProductId] = {
        "purchase_date": now.toISOString(),
        "expires_date": expiration.toISOString(),
        "is_sandbox": false,
        "original_purchase_date": now.toISOString(),
        "period_type": "normal",
        "ownership_type": "PURCHASED",
        "store": "app_store",
        "unsubscribe_detected_at": null
      };
      
      // 添加默认权益
      body.subscriber.entitlements['pro'] = {
        "expires_date": expiration.toISOString(),
        "product_identifier": defaultProductId,
        "purchase_date": now.toISOString()
      };
    }
    else if (url.includes('/v1/offerings') || url.includes('/offerings')) {
      // 报价请求 - 不需要修改
      console.log(`[SatellaJailed] RevenueCat报价请求，保持原样`);
    }
    
    console.log(`[SatellaJailed] RevenueCat验证处理完成`);
  }
  
  // 处理Paddle验证
  function handlePaddleValidation() {
    const bundleId = extractAppInfo();
    console.log(`[SatellaJailed] 处理Paddle验证, bundleId: ${bundleId}`);
    
    if (url.includes('/verify') || url.includes('/license/verify') || url.includes('/license/activate')) {
      // 许可验证
      body.success = true;
      body.verified = true;
      body.expires = expiration.toISOString().split('T')[0];
      
      if (body.response) {
        body.response.type = "subscription";
        body.response.status = "active";
        body.response.expiry_date = expiration.toISOString().split('T')[0];
      } else {
        body.response = {
          "type": "subscription",
          "status": "active",
          "expiry_date": expiration.toISOString().split('T')[0]
        };
      }
    }
    else if (url.includes('/order')) {
      // 订单验证
      body.success = true;
      body.order = body.order || {};
      body.order.status = "processed";
      body.order.completed = true;
    }
    
    console.log(`[SatellaJailed] Paddle验证处理完成`);
  }
  
  // 处理订阅类型验证
  function handleSubscriptionValidation() {
    const bundleId = extractAppInfo();
    console.log(`[SatellaJailed] 处理订阅类型验证, bundleId: ${bundleId}`);
    
    // 找出常见的订阅状态字段
    const statusFields = [
      'active', 'status', 'valid', 'isValid', 'isActive', 'success',
      'premium', 'isPremium', 'isVIP', 'vip', 'pro', 'isPro', 'isPlus',
      'plus', 'enabled', 'isEnabled', 'purchased', 'hasPurchased'
    ];
    
    statusFields.forEach(field => {
      if (typeof body[field] === 'boolean') {
        body[field] = true;
      } else if (typeof body[field] === 'string') {
        body[field] = field === 'status' ? 'active' : 'true';
      } else if (typeof body[field] === 'number') {
        body[field] = 1;
      }
    });
    
    // 找出常见的过期日期字段
    const expiryFields = [
      'expires', 'expiresAt', 'expiry', 'expiryDate', 'expireDate',
      'expiration', 'expirationDate', 'expirationTime', 'validUntil'
    ];
    
    expiryFields.forEach(field => {
      if (typeof body[field] === 'string' && Date.parse(body[field])) {
        body[field] = expiration.toISOString();
      } else if (typeof body[field] === 'number') {
        body[field] = expiration.getTime();
      }
    });
    
    // 处理嵌套对象
    if (body.subscription) {
      handleSubscriptionObject(body.subscription);
    }
    if (body.subscriptions) {
      if (Array.isArray(body.subscriptions)) {
        body.subscriptions.forEach(sub => handleSubscriptionObject(sub));
      } else {
        handleSubscriptionObject(body.subscriptions);
      }
    }
    
    // 添加通用字段
    body.active = true;
    body.expires_date = expiration.toISOString();
    
    console.log(`[SatellaJailed] 订阅验证处理完成`);
  }
  
  // 处理订阅对象
  function handleSubscriptionObject(sub) {
    if (!sub) return;
    
    // 状态字段
    if (sub.status !== undefined) sub.status = 'active';
    if (sub.active !== undefined) sub.active = true;
    if (sub.valid !== undefined) sub.valid = true;
    if (sub.isActive !== undefined) sub.isActive = true;
    if (sub.isValid !== undefined) sub.isValid = true;
    
    // 过期日期
    if (sub.expires !== undefined) sub.expires = expiration.toISOString();
    if (sub.expiresAt !== undefined) sub.expiresAt = expiration.toISOString();
    if (sub.expiry !== undefined) sub.expiry = expiration.toISOString();
    if (sub.expiryDate !== undefined) sub.expiryDate = expiration.toISOString();
    if (sub.expiration !== undefined) sub.expiration = expiration.toISOString();
    if (sub.expires_date !== undefined) sub.expires_date = expiration.toISOString();
    
    // 数字类型时间戳
    if (typeof sub.expiresTime === 'number') sub.expiresTime = expiration.getTime();
    if (typeof sub.expiresTimeMs === 'number') sub.expiresTimeMs = expiration.getTime();
  }
  
  // 通用处理
  function handleGenericValidation() {
    console.log(`[SatellaJailed] 处理通用验证`);
    
    // 查找并修改所有可能的布尔值状态
    Object.keys(body).forEach(key => {
      // 布尔值字段
      if (typeof body[key] === 'boolean' && 
          (key.includes('active') || key.includes('premium') || key.includes('pro') || 
           key.includes('vip') || key.includes('valid') || key.includes('purchased'))) {
        body[key] = true;
      }
      
      // 字符串状态字段
      if (typeof body[key] === 'string' && 
          (key.includes('status') || key.includes('state'))) {
        body[key] = 'active';
      }
      
      // 日期字段
      if (typeof body[key] === 'string' && 
          (key.includes('expire') || key.includes('expiry') || key.includes('expiration')) &&
          Date.parse(body[key])) {
        body[key] = expiration.toISOString();
      }
      
      // 递归处理子对象
      if (typeof body[key] === 'object' && body[key] !== null) {
        deepProcessObject(body[key]);
      }
    });
    
    // 添加通用字段
    body.success = true;
    
    console.log(`[SatellaJailed] 通用验证处理完成`);
  }
  
  // 递归处理深层对象
  function deepProcessObject(obj) {
    if (!obj || typeof obj !== 'object') return;
    
    Object.keys(obj).forEach(key => {
      // 处理布尔值字段
      if (typeof obj[key] === 'boolean' && 
          (key.includes('active') || key.includes('premium') || key.includes('pro') || 
           key.includes('vip') || key.includes('valid') || key.includes('purchased'))) {
        obj[key] = true;
      }
      
      // 处理状态字符串
      if (typeof obj[key] === 'string' && 
          (key.includes('status') || key.includes('state'))) {
        obj[key] = 'active';
      }
      
      // 处理日期字段
      if (typeof obj[key] === 'string' && 
          (key.includes('expire') || key.includes('expiry') || key.includes('expiration')) &&
          Date.parse(obj[key])) {
        obj[key] = expiration.toISOString();
      }
      
      // 递归处理子对象
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        deepProcessObject(obj[key]);
      }
    });
  }
  
  // 主处理函数
  function processValidation() {
    const endpointType = identifyEndpointType();
    console.log(`[SatellaJailed] 识别端点类型: ${endpointType}`);
    
    switch (endpointType) {
      case 'APPLE':
        handleAppleValidation();
        break;
      case 'REVENUECAT':
        handleRevenueCatValidation();
        break;
      case 'PADDLE':
        handlePaddleValidation();
        break;
      case 'SUBSCRIPTION':
        handleSubscriptionValidation();
        break;
      case 'KEYWORD_MATCH':
      case 'GENERIC':
      default:
        handleGenericValidation();
        break;
    }
    
    // 添加标记
    body.SatellaJailed_Ultra = {
      version: "1.0",
      endpoint_type: endpointType,
      modified: true,
      url: url.substring(0, 50) + '...'
    };
    
    console.log(`[SatellaJailed] 处理完成, 端点类型: ${endpointType}`);
    return body;
  }
  
  // 执行处理
  try {
    const modifiedBody = processValidation();
    $.done({ body: JSON.stringify(modifiedBody) });
  } catch (error) {
    console.log(`[SatellaJailed] 错误: ${error.message}, ${error.stack}`);
    // 出错时依然通过
    $.done({});
  }
})();
