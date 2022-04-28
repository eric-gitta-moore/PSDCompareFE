import RechargeAPI from "@/api/Rbac/Recharge";

/**
 * @description 获取支付二维码
 * @param fee {String|Number}
 * @returns {String}
 */
function getQRCode(fee) {
    return RechargeAPI.getQRCode({size: '250', fee});
}

export default {
    getQRCode
}