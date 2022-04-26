// <<<<<<< HEAD
// /**
//      * @description 创建任务组类
//      * @param {string} id 任务组id
//      * @param {string} name 任务组名字
//      * @param {string} createTime 任务组创建时间 
//      */
// class TaskGroup  {
//     constructor({id,name,createTime,orders}){
//         this.id = id;
//         this.name = name;
//         this.createTime  = createTime;
//         this.orders = orders
//     }
// }
// export default {
//     TaskGroup
// }
// =======
import Order from "@/entity/Rbac/Order";

class TaskGroup {
    /**
     * 任务组实体
     * @param {Number} id 任务组id
     * @param {string} name 任务组名
     * @param {string} createTime 创建时间
     * @param {Array.<Order>} orders 订单记录/对比组
     */
    constructor({
                    id,
                    name,
                    createTime,
                    orders
                }) {
        if (orders.length > 0 && !(orders[0] instanceof Order)) {
            throw new Error('orders不是Order实例');
        }
        this.id = id;
        this.name = name;
        this.createTime = createTime;
        this.orders = orders;
    }
}

export default TaskGroup;
// >>>>>>> 914bd5f56822f22c059a84077ca0709c376ce39e
