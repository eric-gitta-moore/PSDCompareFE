import TaskGroup from '../../entity/Rbac/TaskGroup';
import Order from '../../entity/Rbac/Order';
import PageResult from '../../entity/_Common/PageResult'
import TaskGroupApi from '../../api/Rbac/TaskGroup'
import DateHelper from '../../util/DateHelper'
/**
 * @description 获取所有任务组方法
 * @param {int}startPages,当前页
 */

async function getAll(startPages) {
    const maxPages = 10;//每页显示数量
    const sort = "asc";//排序方式（asc）
    const res = await TaskGroupApi.getGroups({
        endTime: "2020-10-2",
        startTime: "2020-10-2",
        keyWords: null,
        startPages,
        maxPages,
        sort,
    });
    let { records: records_use, total, size, current, pages } = res.data;
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
        let { id, name, createTime } = ele;
        return new TaskGroup({
            id, name, createTime, orders
        })
    })
    return new PageResult(
        records, total, size, current, pages
    );
    // <<<<<<< HEAD
    // }

    // async function getGroup(){

    // }
    // /** 
    //  * @description 获取单个任务组
    // */
    // export default {
    //     getGroups,
    //     getGroup,
    // }
    // =======
}
async function deleteTaskByIds(ids) {
    TaskGroupApi.deleteGroup({ ids })
}

async function download(ids) {
    await TaskGroupApi.download({ ids })

}
export default {
    deleteTaskByIds,
    getAll,
    download
};
// >>>>>>> 4f6d8fdd2cca1e1f36d8f9b57e7405998d4dbd53

