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