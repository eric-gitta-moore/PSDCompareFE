/*
 * @Author: Billy
 * @Date: 2021-07-10 20:49:58
 * @LastEditors: Billy
 * @LastEditTime: 2021-09-22 15:22:02
 * @Description: 针对服务器返回值的一些处理方法
 */

import SysCode from "../sys/SysCode.js"
import SysError from "../sys/SysError.js"

// 一般处理方法
function handler(res) {
    console.log(res);
    if (res.data.code === 200) {
        return res.data;
    } else {
        throw new SysError(
            res.data.code,
            res.data.message,
            res.data.data,
        );
    }
}

export default {
    handler
}