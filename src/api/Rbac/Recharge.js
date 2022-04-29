import BaseAxios from "./_BaseAxios.js";
import ResHelper from "../_ResponseHelper.js"
import axios from "axios";
import {BASE_URL} from "@/const";

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
 * @param {String|null} size 二维码大小默认250px
 * @param {String|Number} fee 充值金额
 * @returns {String}
 */
function getQRCode({
                       size,
                       fee
                   }) {
    return `${BASE_URL}/recharge/getQRCode?size=${size}&fee=${fee}`;
}

/**
 * 向支付宝发起支付请求
 * GET /recharge/topay
 * 接口ID：16431705
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16431705
 * @param {String} id 订单id
 * @returns {axios}
 */
function topay({id}) {
    return BaseAxios({
        url: `/recharge/topay`,
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