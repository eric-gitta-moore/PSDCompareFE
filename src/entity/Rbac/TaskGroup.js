/**
     * @description 创建任务组类
     * @param {string} id 任务组id
     * @param {string} name 任务组名字
     * @param {string} createTime 任务组创建时间 
     */
class TaskGroup  {
    constructor({id,name,createTime,orders}){
        this.id = id;
        this.name = name;
        this.createTime  = createTime;
        this.orders = orders
    }
}
export default {
    TaskGroup
}