import OrderLog from "@/entity/Rbac/OrderLog";

class TaskGroup {
    constructor({
                    id,
                    name,
                    createTime,
                    orders
                }) {
        if (orders.length > 0 && !(orders[0] instanceof OrderLog)) {
            throw new Error('orders不是OrderLog实例');
        }
        this.id = id;
        this.name = name;
        this.createTime = createTime;
        this.orders = orders;
    }
}

export default TaskGroup;