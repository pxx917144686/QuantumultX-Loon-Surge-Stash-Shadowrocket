/******************************************
 * DreamFace Pro 解锁脚本
 * 作者: pxx917144686
 * 描述: 解锁 DreamFace 应用的 Pro 功能
 * 日期: 2024-08-26
 ******************************************/

// QuantumultX URL 重写设置
[rewrite_local]
// > DreamFace Pro 解锁
^https?:\/\/dreamfaceapp\.com\/df-server\/user\/save_user_login$ url script-response-body https://raw.githubusercontent.com/pxx917144686/ios/master/rewrite/QuantumultX/DreamFacePro.js

[mitm]
hostname = dreamfaceapp.com
******************************************/

/******************************************
 * 常量定义
 ******************************************/

const VIP_PRODUCT_ID       = "TRY_YEAR_PACKAGE";        // 产品 ID
const VIP_TYPE             = "YEAR";                    // VIP 类型
const VIP_LABEL            = "Pro Membership";          // VIP 标签
const VIP_REMINDER_DAY     = 999999;                    // 提醒天数
const EXPIRES_DATE         = "2099-12-28T09:00:00.000Z"; // 到期日期
const EXPIRES_DATE_FORMAT  = "2099-12-28 09:00:00";     // 格式化到期日期
const HAVE_TRIAL           = false;                     // 是否有试用
const RENEWAL              = true;                      // 是否续订

/******************************************
 * 函数: modifyResponse
 * 作用: 修改原始响应数据为 VIP 信息
 ******************************************/

/**
 * 修改响应数据，返回 VIP 订阅信息
 * @param {string} responseBody - 原始 JSON 响应体字符串
 * @returns {string} 修改后的 JSON 响应体字符串
 */
function modifyResponse(responseBody) {
    try {
        // 解析原始响应数据
        const response = JSON.parse(responseBody);

        // 构建新的 VIP 权限对象
        const vipRights = {
            "renewal": RENEWAL,
            "vip_type": VIP_TYPE,
            "vip_label": VIP_LABEL,
            "vip_reminder_day": VIP_REMINDER_DAY,
            "expires_date": EXPIRES_DATE,
            "have_trial": HAVE_TRIAL,
            "expires_date_format": EXPIRES_DATE_FORMAT
        };

        // 更新响应数据，插入 VIP 信息
        response.vip_product_id = VIP_PRODUCT_ID;
        response.data = { "rights": vipRights };

        // 将修改后的响应数据转换为字符串返回
        return JSON.stringify(response);

    } catch (error) {
        // 捕获并记录错误信息，防止脚本崩溃
        console.error("修改 DreamFace 响应时发生错误: ", error);
        return responseBody; // 如果发生错误，返回原始响应数据
    }
}

/******************************************
 * 执行脚本主流程
 ******************************************/

// 调用 modifyResponse 函数并返回结果
$done({
    body: modifyResponse($response.body)
});

/******************************************
 * 结束
 ******************************************/
