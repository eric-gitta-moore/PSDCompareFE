import BaseAxios from "./_BaseAxios.js";
import ResHelper from "../_ResponseHelper.js"
import axios from "axios";

/**
 * 获取user余额信息
 * GET /user/getUser
 * 接口ID：17005380
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-17005380
 * @returns {axios}
 */
function getUser() {
    return BaseAxios({
        url: `/user/getUser`,
        method: 'get',
    }).then(ResHelper);
}


/**
 * 获取跳转收银台二维码
 * GET /recharge/getQRCode
 * 接口ID：16431685
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16431685
 * @param {string|null} size 二维码大小默认250px
 * @param {string} fee 充值金额
 * @returns {axios}
 */
function getQRCode({
                       size,
                       fee
                   }) {
    return BaseAxios({
        url: `/recharge/getQRCode`,
        method: 'get',
        params: {
            size,
            fee,
        }
    }).then(ResHelper);
}

/**
 * 向支付宝发起支付请求
 * GET /recharge/topay
 * 接口ID：16431705
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16431705
 * @param {string} id 订单id
 * @returns {axios}
 */
function topay({id}) {
    return BaseAxios({
        url: `/recharge/getQRCode`,
        method: 'get',
        params: {
            id,
        }
    }).then(ResHelper);
}

export default {
    getUser,
    getQRCode,
    topay,
}