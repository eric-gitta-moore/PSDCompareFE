import BaseAxios from "./_BaseAxios.js";
import ResHelper from "../_ResponseHelper.js"
import axios from "axios";

/**
 * 获取单个任务组
 * GET /taskGroup/getGroupById
 * 接口ID：16559787
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16559787
 * @param {Number} groupId 任务组id
 * @returns {axios}
 */
function getGroupById({
    groupId
}) {

    return BaseAxios({
        url: `/taskGroup/getGroupById`,
        method: "get",
        params: {
            groupId
        },
    }).then(ResHelper.handler);
}


/**
 * 获取所有的Group，and 条件收索
 * POST /taskGroup/getGroups
 * 接口ID：16559807
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16559807
 * @param {string|null} keyWords 搜索关键字
 * @param {number} startPage 当前页
 * @param {number} maxPage 页面大小
 * @param {string|null} startTime 开始时间
 * @param {string|null} endTime 结束时间
 * @param {'asc'|'desc'} sort 排序方式
 * @returns {axios}
 */
function getGroups({
    keyWords = null,
    startPage = 1,
    maxPage = 5,
    startTime = null,
    endTime = null,
    sort = 'asc'
}) {
    return BaseAxios({
        url: `/taskGroup/getGroups`,
        method: "post",
        data: {
            keyWords,
            startPage,
            maxPage,
            startTime,
            endTime,
            sort
        },
    }).then(ResHelper.handler);
}

/**
 * 创建新的taskGroup
 * POST /taskGroup/create
 * 接口ID：16559829
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16559829
 * @param {string} name 任务组名称
 * @returns {axios}
 */
function createGroup({
    name
}) {
    return BaseAxios({
        url: `/taskGroup/create`,
        method: "post",
        data: {
            name,
        },
    }).then(ResHelper.handler);
}

/**
 * 批量删除group
 * DELETE /taskGroup/delete
 * 接口ID：16559854
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16559854
 * @param {Array.<number>} ids
 * @returns {axios}
 */
function deleteGroup({
    ids
}) {
    return BaseAxios({
        url: `/taskGroup/delete`,
        method: "delete",
        data: [...ids],
    }).then(ResHelper.handler);
}

/**
 * 根据taskgroupId批量下载文件
 * GET /taskGroup/download
 * 接口ID：16981068
 * 接口地址：https://www.apifox.cn/web/project/838613/apis/api-16981068
 * @param {Array.<number>} ids
 * @returns {axios}
 */
function download({
    ids
}) {
    return BaseAxios({
        url: `/taskGroup/download`,
        method: "get",
        params: {
            ids
        },
    }).then(ResHelper.handler);
}

export default {
    getGroupById,
    getGroups,
    createGroup,
    deleteGroup,
    download,
}