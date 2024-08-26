/******************************************
 * @Name 𝐷𝑟𝑒𝑎𝑚𝐹𝑎𝑐𝑒
 * @Description 𝑈𝑛𝑙𝑜𝑐𝑘 𝑃𝑟𝑜 𝐹𝑒𝑎𝑡𝑢𝑟𝑒𝑠
 * @Channel https://t.me/yqc_123
 * @Author 𝐻𝑎𝑢𝑠𝑑𝑜𝑟𝑓𝑓
 * @Update 20240624
 * @Link http://t.cn/A6QiX08k
 * @Version 3.11.0
 ******************************************
[rewrite_local]
# > 𝐷𝑟𝑒𝑎𝑚𝐹𝑎𝑐𝑒 𝐶𝑟𝑎𝑐𝑘 𝑃𝑟𝑜
^https?:\/\/dreamfaceapp\.com\/df-server\/user\/save_user_login$ url script-response-body https://gist.githubusercontent.com/yqc007/4fc79102559fa075f36141587cc686ab/raw/DreamFacePro.js
[mitm]
hostname = dreamfaceapp.com

/******************************************
 * 配置管理模块
 * -------------------------------------- *
 * 作用: 用于统一管理脚本的各项配置
 ******************************************/

const config = {
    VIP_PRODUCT_ID: "TRY_YEAR_PACKAGE",        // 产品 ID
    VIP_TYPE: "YEAR",                          // VIP 类型
    VIP_LABEL: "Pro Membership",               // VIP 标签
    VIP_REMINDER_DAY: 999999,                  // 提醒天数
    EXPIRES_DATE: "2099-12-28T09:00:00.000Z",  // 到期日期
    EXPIRES_DATE_FORMAT: "2099-12-28 09:00:00",// 格式化到期日期
    HAVE_TRIAL: false,                         // 是否有试用
    RENEWAL: true                              // 是否续订
};

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
        const response = JSON.parse(responseBody);
        
        response.vip_product_id = config.VIP_PRODUCT_ID;
        response.data = {
            "rights": {
                "renewal": config.RENEWAL,
                "vip_type": config.VIP_TYPE,
                "vip_label": config.VIP_LABEL,
                "vip_reminder_day": config.VIP_REMINDER_DAY,
                "expires_date": config.EXPIRES_DATE,
                "have_trial": config.HAVE_TRIAL,
                "expires_date_format": config.EXPIRES_DATE_FORMAT
            }
        };
        
        return JSON.stringify(response);

    } catch (error) {
        console.error("修改 DreamFace 响应时发生错误", error);
        return responseBody; // 如果发生错误，返回原始响应数据
    }
}

/******************************************
 * 主流程
 ******************************************/

// 调用 modifyResponse 函数并返回结果
const modifiedResponse = modifyResponse($response.body);
$done({
    body: modifiedResponse
});

/******************************************
 * 结束
 ******************************************/
