/*
图像大小 Apple商店:https://apps.apple.com/us/app/%E5%9B%BE%E5%83%8F%E5%A4%A7%E5%B0%8F/id670766542?l=zh-Hans-CN
[rewrite_local]
^https:\/\/apimboom2\.globaldelight\.net\/itunesreceipt_v2\.php$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/TXDX.js
[mitm]
hostname = buy.itunes.apple.com
*/

const bundleId = "vsmedia.de.imagesize";
const productId = "vsmedia.de.imagesize.premium";

function createReceipt() {
  const currentTs = Math.floor(Date.now() / 1000);
  const expiryTs = 4070908800000;
  const expiryDate = "2099-01-01 00:00:00 Etc/GMT";
  const purchaseDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ' Etc/GMT');
  const purchaseTs = currentTs * 1000;
  
  return {
    "status": 0,
    "environment": "Production",
    "receipt": {
      "receipt_type": "Production",
      "app_item_id": 670766542,
      "bundle_id": bundleId,
      "original_purchase_date": purchaseDate,
      "in_app": [{
        "quantity": "1",
        "product_id": productId,
        "transaction_id": "1000000" + Math.floor(Math.random() * 90000000 + 10000000),
        "original_transaction_id": "1000000" + Math.floor(Math.random() * 90000000 + 10000000),
        "purchase_date": purchaseDate,
        "purchase_date_ms": purchaseTs,
        "original_purchase_date": purchaseDate,
        "original_purchase_date_ms": purchaseTs,
        "expires_date": expiryDate,
        "expires_date_ms": expiryTs,
        "web_order_line_item_id": "1000000" + Math.floor(Math.random() * 90000000),
        "is_trial_period": "false",
        "is_in_intro_offer_period": "false"
      }]
    },
    "latest_receipt_info": [{
      "quantity": "1",
      "product_id": productId,
      "transaction_id": "1000000" + Math.floor(Math.random() * 90000000 + 10000000),
      "original_transaction_id": "1000000" + Math.floor(Math.random() * 90000000 + 10000000),
      "purchase_date": purchaseDate,
      "purchase_date_ms": purchaseTs,
      "original_purchase_date": purchaseDate,
      "original_purchase_date_ms": purchaseTs,
      "expires_date": expiryDate,
      "expires_date_ms": expiryTs,
      "is_trial_period": "false",
      "is_in_intro_offer_period": "false"
    }],
    "latest_receipt": "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",
    "pending_renewal_info": [{
      "product_id": productId,
      "original_transaction_id": "1000000" + Math.floor(Math.random() * 90000000 + 10000000),
      "auto_renew_product_id": productId,
      "auto_renew_status": "0"
    }]
  };
}

function main() {
  let obj = JSON.parse($response.body || '{}');
  console.log('原始响应: ' + JSON.stringify(obj).substring(0, 50) + '...');
  if (obj && (obj.receipt || obj.status !== undefined)) {
    console.log('检测到收据验证请求，替换为伪造收据');
    obj = createReceipt();
  }
  if (obj.app_info && obj.app_info.package_name === bundleId) {
    console.log('检测到应用特定信息，添加高级状态标记');
    obj.premium_access = true;
    obj.subscription_active = true;
    obj.premium_features = {
      "all_features_unlocked": true,
      "no_ads": true,
      "premium_tools": true
    };
  }
  $done({body: JSON.stringify(obj)});
}

main();
