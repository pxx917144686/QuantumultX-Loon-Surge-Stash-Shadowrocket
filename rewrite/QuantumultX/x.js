
[rewrite_local]
# Apple官方验证
^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$ url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/x.js

# RevenueCat验证
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-response-body https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/x.js
^https:\/\/api\.(revenuecat|rc-backup)\.com\/.+\/(receipts$|subscribers\/?(.*?)*$) url script-request-header https://raw.githubusercontent.com/pxx917144686/QuantumultX-Loon-Surge-Stash-Shadowrocket/refs/heads/master/rewrite/QuantumultX/x.js

[mitm]
hostname = buy.itunes.apple.com, api.revenuecat.com, api.rc-backup.com

*************************************/

(function() {
  const $ = {};
  $.request = $request;
  $.response = $response;
  $.done = (obj) => $done(obj);
  
  // 请求URL
  const url = $.request.url;
  
  // 处理不同类型的请求
  if (url.includes('buy.itunes.apple.com/verifyReceipt')) {
    handleAppleReceipt();
  } else if (url.includes('api.revenuecat.com') || url.includes('api.rc-backup.com')) {
    if ($.response && $.response.body) {
      handleRevenueCat();
    } else {
      // 处理请求头
      handleRevenueCatHeader();
    }
  } else {
    // 其他未知类型，尝试通用处理
    handleGeneric();
  }
  
  /**
   * 处理Apple收据验证
   */
  function handleAppleReceipt() {
    let body = JSON.parse($.response.body);
    const ua = $.request.headers['User-Agent'] || $.request.headers['user-agent'] || '';
    const bundle_id = body.receipt?.bundle_id || body.receipt?.Bundle_Id || '';
    const yearlyid = `${bundle_id}.yearly`;
    const lifetimeid = `${bundle_id}.lifetime`;
    
    console.log(`[SatellaJailed] 处理Apple验证: ${bundle_id}`);
    
    // 扩展应用列表 (结合SatellaJailed覆盖的应用)
    const list = {
      'ProKnockOut': { cm: 'timeb', hx: 'hxpda', id: "com.knockout.SVIP.50off", latest: "SatellaJailed" },
      'me.imgbase.imgplay': { cm: 'timea', hx: 'hxpda', id: "me.imgbase.imgplay.subscriptionYearly", latest: "SatellaJailed" },
      'MVH6DNU2ZP.input': { cm: 'timea', hx: 'hxpda', id: "com.logcg.loginput", latest: "SatellaJailed" },
      'ChickAlarmClock': { cm: 'timea', hx: 'hxpda', id: "com.ChickFocus.ChickFocus.yearly_2023_promo", latest: "SatellaJailed" },
      'co.vulcanlabs.moodtracker': { cm: 'timea', hx: 'hxpda', id: "co.vulcanlabs.moodtracker.lifetime2", latest: "SatellaJailed" },
      // 添加更多SatellaJailed支持的应用
      'com.apple.Keynote': { cm: 'timea', hx: 'hxpda', id: "com.apple.Keynote.premium", latest: "SatellaJailed" },
      'com.apple.Numbers': { cm: 'timea', hx: 'hxpda', id: "com.apple.Numbers.premium", latest: "SatellaJailed" },
      'com.apple.Pages': { cm: 'timea', hx: 'hxpda', id: "com.apple.Pages.premium", latest: "SatellaJailed" },
      'net.shinyfrog.bear': { cm: 'timea', hx: 'hxpda', id: "net.shinyfrog.bear_iOS.pro_yearly_subscription", latest: "SatellaJailed" },
      'photo.editor.polarr': { cm: 'timea', hx: 'hxpda', id: "co.polarr.polarrphotoeditor.pro.yearly", latest: "SatellaJailed" }
    };
    
    // 内购数据变量
    const now = new Date();
    const expiration = new Date('2099-09-09');
    const txId = Math.floor(Math.random() * 900000000000000) + 100000000000000;
    
    const receipt = { 
      "quantity": "1", 
      "purchase_date_ms": now.getTime().toString(), 
      "is_in_intro_offer_period": "false", 
      "transaction_id": txId.toString(), 
      "is_trial_period": "false", 
      "original_transaction_id": txId.toString(), 
      "purchase_date": formatDate(now), 
      "product_id": yearlyid, 
      "original_purchase_date_pst": formatPSTDate(now), 
      "in_app_ownership_type": "PURCHASED", 
      "original_purchase_date_ms": now.getTime().toString(), 
      "web_order_line_item_id": (txId + 1).toString(), 
      "purchase_date_pst": formatPSTDate(now), 
      "original_purchase_date": formatDate(now) 
    };
    
    const expirestime = { 
      "expires_date": formatDate(expiration), 
      "expires_date_pst": formatPSTDate(expiration), 
      "expires_date_ms": expiration.getTime().toString() 
    };
    
    let anchor = false;
    let data;
    
    // 核心内容处理
    for (const i in list) {
      const regex = new RegExp(`^${i}`, `i`);
      if (regex.test(ua) || regex.test(bundle_id)) {
        const { cm, hx, id, ids, latest, version } = list[i];
        const receiptdata = Object.assign({}, receipt, { "product_id": id });
        
        // 处理数据
        switch (cm) {
          case 'timea':
            data = [ Object.assign({}, receiptdata, expirestime)];
            break;
          case 'timeb':
            data = [receiptdata];
            break;
          case 'timec':
            data = [];
            break;
          case 'timed':
            data = [
              Object.assign({}, receiptdata, expirestime, { "product_id": ids }),
              Object.assign({}, receiptdata, expirestime, { "product_id": id })
            ];
            break;
        }
        
        // 处理核心收尾
        if (hx.includes('hxpda')) {
          body["receipt"]["in_app"] = data;
          body["latest_receipt_info"] = data;
          body["pending_renewal_info"] = [{ "product_id": id, "original_transaction_id": txId.toString(), "auto_renew_product_id": id, "auto_renew_status": "1" }];
          body["latest_receipt"] = latest;
        }
        else if (hx.includes('hxpdb')) {
          body["receipt"]["in_app"] = data;
        }
        else if (hx.includes('hxpdc')) {
          const xreceipt = { "expires_date_formatted" : formatDate(expiration), "expires_date" : expiration.getTime().toString(), "expires_date_formatted_pst" : formatPSTDate(expiration), "product_id" : id, };
          body["receipt"] = Object.assign({}, body["receipt"], xreceipt);
          body["latest_receipt_info"] = Object.assign({}, body["receipt"], xreceipt);
          body["status"] = 0;
          body["auto_renew_status"] = 1;
          body["auto_renew_product_id"] = id;
          delete body["latest_expired_receipt_info"];
          delete body["expiration_intent"];
        }
        
        // 判断是否需要加入版本号
        if (version && version.trim() !== '') { body["receipt"]["original_application_version"] = version; }
        anchor = true;
        console.log(`[SatellaJailed] 操作成功: ${bundle_id}, 使用产品ID: ${id}`);
        break;
      }
    }
    
    // 如果没有匹配到 UA 或 bundle_id 使用备用方案 (SatellaJailed的通用处理)
    if (!anchor) {
      // 尝试猜测最可能的产品ID
      const possibleIds = [
        `${bundle_id}.yearly`, 
        `${bundle_id}.year`,
        `${bundle_id}.annual`, 
        `${bundle_id}.pro`,
        `${bundle_id}.premium`,
        `${bundle_id}.plus`,
        `${bundle_id}.vip`, 
        `${bundle_id}.lifetime`
      ];
      
      const productId = possibleIds[0]; // 使用第一个可能的ID
      data = [ Object.assign({}, receipt, expirestime, { "product_id": productId })];
      
      body["receipt"]["in_app"] = data;
      body["latest_receipt_info"] = data;
      body["pending_renewal_info"] = [{ "product_id": productId, "original_transaction_id": txId.toString(), "auto_renew_product_id": productId, "auto_renew_status": "1" }];
      body["latest_receipt"] = "SatellaJailed_QX_" + Math.random().toString(36).substring(2,7);
      body["status"] = 0;
      
      console.log(`[SatellaJailed] 使用备用方案: ${bundle_id}, 产品ID: ${productId}`);
    }
    
    body["SatellaJailed"] = "QuantumultX版";
    $.done({ body: JSON.stringify(body) });
  }
  
  /**
   * 处理RevenueCat验证
   */
  function handleRevenueCat() {
    try {
      let body = JSON.parse($.response.body);
      console.log(`[SatellaJailed] 处理RevenueCat响应`);
      
      const now = new Date();
      const expiration = new Date('2099-09-09');
      
      // 1. 处理subscriber信息
      if (body.subscriber) {
        // 处理订阅信息
        if (body.subscriber.subscriptions) {
          for (const key in body.subscriber.subscriptions) {
            body.subscriber.subscriptions[key] = {
              "purchase_date": now.toISOString(),
              "expires_date": expiration.toISOString(),
              "is_sandbox": false,
              "original_purchase_date": now.toISOString(),
              "period_type": "normal",
              "ownership_type": "PURCHASED",
              "store": "app_store",
              "unsubscribe_detected_at": null
            };
          }
          
          // 如果没有订阅，添加一个默认订阅
          if (Object.keys(body.subscriber.subscriptions).length === 0) {
            const defaultKey = "default_subscription";
            body.subscriber.subscriptions[defaultKey] = {
              "purchase_date": now.toISOString(),
              "expires_date": expiration.toISOString(),
              "is_sandbox": false,
              "original_purchase_date": now.toISOString(),
              "period_type": "normal",
              "ownership_type": "PURCHASED",
              "store": "app_store",
              "unsubscribe_detected_at": null
            };
          }
        }
        
        // 处理权益信息
        if (body.subscriber.entitlements) {
          for (const key in body.subscriber.entitlements) {
            body.subscriber.entitlements[key] = {
              "expires_date": expiration.toISOString(),
              "product_identifier": Object.keys(body.subscriber.subscriptions)[0] || "default_subscription",
              "purchase_date": now.toISOString()
            };
          }
          
          // 如果没有权益，添加默认权益
          if (Object.keys(body.subscriber.entitlements).length === 0) {
            body.subscriber.entitlements["premium"] = {
              "expires_date": expiration.toISOString(),
              "product_identifier": Object.keys(body.subscriber.subscriptions)[0] || "default_subscription",
              "purchase_date": now.toISOString()
            };
          }
        }
      }
      
      console.log(`[SatellaJailed] RevenueCat处理完成`);
      $.done({ body: JSON.stringify(body) });
    } catch (e) {
      console.log(`[SatellaJailed] RevenueCat处理错误: ${e}`);
      $.done({});
    }
  }
  
  /**
   * 处理RevenueCat请求头
   */
  function handleRevenueCatHeader() {
    try {
      console.log(`[SatellaJailed] 处理RevenueCat请求头`);
      // 修改请求头以绕过验证
      const headers = $.request.headers;
      
      // 添加或修改特定头信息可能有助于绕过验证
      // 这部分需要根据具体情况调整
      
      $.done({ headers: headers });
    } catch (e) {
      console.log(`[SatellaJailed] RevenueCat请求头处理错误: ${e}`);
      $.done({});
    }
  }
  
  /**
   * 处理通用请求
   */
  function handleGeneric() {
    try {
      if (!$.response || !$.response.body) {
        $.done({});
        return;
      }
      
      let body = JSON.parse($.response.body);
      console.log(`[SatellaJailed] 尝试处理通用响应`);
      
      const now = new Date();
      const expiration = new Date('2099-09-09');
      
      // 检查并修改常见的订阅状态字段
      const statusFields = ['active', 'status', 'valid', 'isValid', 'isActive', 'success', 'isPremium', 'premium', 'pro', 'isPro', 'isVIP', 'vip'];
      const expiryFields = ['expires', 'expiresAt', 'expiryDate', 'expireDate', 'expiration', 'expires_date'];
      
      // 递归处理对象
      function processObject(obj) {
        if (!obj || typeof obj !== 'object') return;
        
        for (const key in obj) {
          // 处理状态字段
          if (statusFields.includes(key)) {
            if (typeof obj[key] === 'boolean') {
              obj[key] = true;
            } else if (typeof obj[key] === 'string') {
              obj[key] = key === 'status' ? 'active' : 'true';
            } else if (typeof obj[key] === 'number') {
              obj[key] = 1;
            }
          }
          
          // 处理过期时间字段
          if (expiryFields.includes(key)) {
            if (typeof obj[key] === 'string') {
              obj[key] = expiration.toISOString();
            } else if (typeof obj[key] === 'number') {
              obj[key] = expiration.getTime();
            }
          }
          
          // 递归处理子对象
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            processObject(obj[key]);
          }
        }
      }
      
      processObject(body);
      console.log(`[SatellaJailed] 通用响应处理完成`);
      $.done({ body: JSON.stringify(body) });
    } catch (e) {
      console.log(`[SatellaJailed] 通用响应处理错误: ${e}`);
      $.done({});
    }
  }
  
  /**
   * 格式化日期为GMT格式
   */
  function formatDate(date) {
    return date.toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' Etc/GMT');
  }
  
  /**
   * 格式化为PST时区日期
   */
  function formatPSTDate(date) {
    const pstDate = new Date(date.getTime() - 7 * 60 * 60 * 1000);
    return pstDate.toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' America/Los_Angeles');
  }
})();
