import FileApi from '@/api/Rbac/File';
import CommonResult from "@/entity/_Common/CommonResult";

/**
 * @description 创建对比组
 * @param referenceFiles
 * @param compareFiles
 * @param {Number} taskId
 * @returns {Promise<string>}
 */
async function addCompareGroup({
                                   referenceFiles,
                                   compareFiles,
                                   taskId,
                               }) {
    let r = await FileApi.upload({
        file1: referenceFiles,
        file2: compareFiles,
        taskId,
    })
    let commonResult = new CommonResult(r.data, r.message, r.code);
    return commonResult.message;
}

/**
 * @description 获取下载链接
 * @param {Array.<Number>} ids
 * @returns {String}
 */
function getDownloadUrl(ids) {
    return FileApi.download({ids});
}

/**
 * @description 获取任务组下载链接
 * @param {Array.<Number>} ids
 * @returns {String}
 */
function getTaskDownloadUrl(ids) {
    return FileApi.downloadTask({ids});
}


export default {
    addCompareGroup,
    getDownloadUrl,
    getTaskDownloadUrl,

}