import BaseAxios from "./_BaseAxios.js";
import ResHelper from "../_ResponseHelper.js"
import axios from "axios";

/**
 * @description 上传文件
 * @param file1 {Array.<File>}
 * @param file2 {Array.<File>}
 * @param taskId {Number}
 * @returns {axios}
 */
function upload({
                    file1,
                    file2,
                    taskId
                }) {
    let data = new FormData();
    for (const file of file1) {
        data.append('file1', file);
    }
    for (const file of file2) {
        data.append('file2', file);
    }
    data.append('taskId', taskId + '');
    return BaseAxios({
        url: `/sys/login`,
        method: "post",
        data,
    }).then(ResHelper.handler);
}


/**
 * 批量下载文件
 * GET /file/download
 * 接口ID：16431612
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16431612
 * @param ids {Array.<number>}
 * @returns {axios}
 */
function download({ids}) {
    return BaseAxios({
        url: `/file/download`,
        method: "get",
        params: {
            ids,
        },
    }).then(ResHelper.handler);
}