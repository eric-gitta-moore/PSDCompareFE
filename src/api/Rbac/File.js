import BaseAxios from "./_BaseAxios.js";
import ResHelper from "../_ResponseHelper.js"

/**
 * @description 上传文件
 * @param file1 {Array.<File>}
 * @param file2 {Array.<File>}
 * @param taskId {Number}
 * @returns {*}
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