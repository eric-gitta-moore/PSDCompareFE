class File {
    /**
     * 文件实体
     * @param {Number} id 文件id
     * @param {string} name 文件名
     * @param {Number} taskId 任务组id
     * @param {string} size 文件大小
     * @param {string} createTime 创建时间
     * @param {Number} orderId 订单id，对比组id
     */
    constructor({
                    id,
                    name,
                    taskId,
                    size,
                    createTime,
                    orderId
                }) {
        this.id = id;
        this.name = name;
        this.taskId = taskId;
        this.size = size;
        this.createTime = new Date(createTime);
        this.orderId = orderId;
    }
}

export default File;