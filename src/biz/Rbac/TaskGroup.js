import TaskGroup from '../../entity/Rbac/TaskGroup';
import Order from '../../entity/Rbac/Order';
import PageResult from '../../entity/_Common/PageResult'
import TaskGroupApi from '../../api/Rbac/TaskGroup'
import DateHelper from '../../util/DateHelper'
import FileEntity from "@/entity/Rbac/File";


/**
 * 格式化记录集
 * @param records_use
 * @returns {Array.<TaskGroup>}
 */
function formatRecords(records_use) {
    return records_use.map(ele => {
        ele.createTime = DateHelper.format(new Date(ele.createTime), "yyyy-MM-dd hh:mm:ss");
        delete ele.deleted;
        ele.createTime = DateHelper.format(new Date(ele.createTime), "yyyy-MM-dd hh:mm:ss");
        let orders = ele.orders.map(ele => {
            if (ele.id === null) return null;
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
            if (url) {
                if (url.indexOf("http") === -1 && url.indexOf("//") === -1) {
                    url = "//" + url;
                }
            }
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
        //过滤id为空的order
        orders = orders.filter(e => (Boolean(e) && Boolean(e.id)));

        return new TaskGroup({
            id,
            name,
            createTime,
            orders
        })
    });
}

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
    return new PageResult(
        formatRecords(records_use), total, size, current, pages
    );
}

/**
 * 获取单个任务组
 * @param {Number} taskId
 * @returns {Promise<TaskGroup>}
 */
async function find({taskId}) {
    const r = await TaskGroupApi.getGroupById({groupId: taskId});
    let {records: records_use, total, size, current, pages} = r.data;
    return formatRecords(records_use)[0];
}

/**
 * 批量删除
 * @param ids {Array.<Number|String>}
 * @returns {Promise<>}
 */
async function delTaskByIds(ids) {
    TaskGroupApi.deleteGroup({ids})
}

/**
 * 批量下载
 * @param ids {Array.<Number|String>}
 * @returns {Promise<>}
 */
async function download(ids) {
    return TaskGroupApi.download({ids})
}

/**
 * 新建任务组
 * @param {String} name
 * @returns {Promise<axios>}
 */
async function addTaskGroup({name}) {
    return TaskGroupApi.createGroup({name});
}


export default {
    delTaskByIds,
    getAll,
    download,
    addTaskGroup,
    find,

};

