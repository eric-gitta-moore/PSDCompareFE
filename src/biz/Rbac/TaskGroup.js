import TaskGroup from '../../entity/Rbac/TaskGroup';
import Order from '../../entity/Rbac/Order';
import UserLogin from '../../api/Rbac/UserLogin'
import PageResult from '../../entity/_Common/PageResult'

/**
 * @description 获取所有任务组方法
 * @param {int}startPages,当前页
 */
async function getAll(startPages) {
    const maxPages = 10;//每页显示数量
    const sort = asc;//排序方式（asc）
    const res = await UserLogin.getAll({
        endTime: "2020-10-2",
        startTime: "2020-10-2",
        keyWords: null,
        startPages,
        maxPages,
        sort,
    })
    let orders = new Array();
    const taskGroup = new TaskGroup;
    res.data.data.records.forEach(element => {
        element.forEach(ele=>{
            
        })
    });
    // res.data.data.records.orders.forEach(element => {
    //     element.status = element.status === "complete" ? "已完成" : "未完成";
    //     let { id, status, fee, title, serialNumber, createTime, url, result } = element;
    //     let order = new Order({
    //         id, status, fee, title, serialNumber, createTime, url, result
    //     });
    //     orders.push(order)
    // });

}


