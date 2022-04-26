import TaskGroup from '../../entity/Rbac/TaskGroup';
import Order from '../../entity/Rbac/Order';
import PageResult from '../../entity/_Common/PageResult'
import TaskGroupApi from '../../api/Rbac/TaskGroup'
import DateHelper from '../../util/DateHelper'
// import  from ''
// <<<<<<< HEAD
// import DateHelper from '../../util/DateHelper'
// // import  from ''
// =======
// import DateHelper from "../../util/DateHelper";
// >>>>>>> 22ae39b39f1b77db169c987c662cc0a90eaf5ce7
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
// <<<<<<< HEAD
//             ele.createTime = DateHelper.format(new Date(ele.createTime), "yyyy-MM-dd hh:mm:ss");
//             if (ele.files === null) ele.files = [];
// =======
            if (ele.files === null) ele.files = [];
            ele.createTime = DateHelper.format(new Date(ele.createTime), "yyyy-MM-dd hh:mm:ss")
// >>>>>>> 22ae39b39f1b77db169c987c662cc0a90eaf5ce7
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
}  
async function deleteTaskByIds(Ids){
    TaskGroupApi.deleteGroup(Ids)
}        

async function  download(Ids){
    TaskGroupApi.download(Ids)
    
}
export default {
    deleteTaskByIds,
    getAll,
    download
};

