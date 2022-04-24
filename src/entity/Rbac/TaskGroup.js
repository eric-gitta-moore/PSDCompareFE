import Order from "@/entity/Rbac/Order";

class TaskGroup {
    /**
     * 任务组模型
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