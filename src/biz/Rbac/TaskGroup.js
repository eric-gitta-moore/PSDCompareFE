import TaskGroup from '../../entity/Rbac/TaskGroup';
import Order from '../../entity/Rbac/Order';
import PageResult from '../../entity/_Common/PageResult'
import TaskGroupApi from '../../api/Rbac/TaskGroup'
import DateHelper from '../../util/DateHelper'
import FileEntity from "@/entity/Rbac/File";

/**
 *
 *
 * @description 获取所有任务组方法
 * @param {Number} startPages 当前页
 * @param {Number} pageSize
 * @param {String} keyWords
 * @param {String} startTime
 * @param {String} endTime
 * @param {'desc'||'asc'} sort
 * @returns {Promise<PageResult>}
 */
async function getAll(startPages = 1,
                      pageSize = 5,
                      keyWords = '',
                      startTime = '',
                      endTime = '',
                      sort = 'desc') {
    const res = await TaskGroupApi.getGroups({
        endTime,
        startTime,
        keyWords: keyWords,
        startPages,
        maxPages: pageSize,
        sort,
    });
    let {records: records_use, total, size, current, pages} = res.data;
    let records = records_use.map(ele => {
        ele.createTime = DateHelper.format(new Date(ele.createTime), "yyyy-MM-dd hh:mm:ss");
        delete ele.deleted;
        ele.createTime = DateHelper.format(new Date(ele.createTime), "yyyy-MM-dd hh:mm:ss");
        let orders = ele.orders.map(ele => {
            ele.status = ele.status === "complete" ? "已成功" : "未成功";
            if (ele.files === null) ele.files = [];
            ele.createTime = DateHelper.format(new Date(ele.createTime), "yyyy-MM-dd hh:mm:ss")
            let {
                id,
                status,
                fee,
                title,
                serialNumber,
                createTime,
                url,
                size,
                resolution,
                taskId,
                result,
                fileName,
                files
            } = ele;
            if (files !== null)
                files = files.map(e => {
                    if (e === null) return null;
                    let {
                        id,
                        name,
                        taskId,
                        size,
                        createTime,
                        orderId
                    } = e;
                    return new FileEntity({
                        id,
                        name,
                        taskId,
                        size,
                        createTime,
                        orderId
                    })
                })
            return new Order({
                id,
                status,
                fee,
                title,
                serialNumber,
                createTime,
                url,
                size,
                resolution,
                taskId,
                result,
                fileName,
                files
            })
        })
        let {id, name, createTime} = ele;

        return new TaskGroup({
            id,
            name,
            createTime,
            orders
        })
    })
    return new PageResult(
        records, total, size, current, pages
    );
}

/**
 * 批量删除
 * @param ids {Array.<Number|String>}
 * @returns {Promise<void>}
 */
async function deleteTaskByIds(ids) {
    TaskGroupApi.deleteGroup({ids})
}

/**
 * 批量下载
 * @param ids {Array.<Number|String>}
 * @returns {Promise<void>}
 */
async function download(ids) {
    await TaskGroupApi.download({ids})

}

export default {
    deleteTaskByIds,
    getAll,
    download
};

