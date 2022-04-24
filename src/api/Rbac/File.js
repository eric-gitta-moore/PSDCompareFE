import BaseAxios from "./_BaseAxios.js";
import ResHelper from "../_ResponseHelper.js"
import axios from "axios";

/**
 * 上传文件
 * POST /file/upload
 * 接口ID：16431566
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16431566
 * @param {Array.<File>} file1
 * @param {Array.<File>} file2
 * @param {Number} taskId
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
        url: `/file/upload`,
        method: "post",
        data,
    }).then(ResHelper.handler);
}


/**
 * 批量下载文件
 * GET /file/download
 * 接口ID：16431612
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16431612
 * @param {Array.<number>} ids
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

export default {
    upload,
    download,
}