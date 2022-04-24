class File {
    constructor({
                    id,
                    filecode,
                    name,
                    taskId,
                    size,
                    createTime,
                    orderId
                }) {
        this.id = id;
        this.filecode = filecode;
        this.name = name;
        this.taskId = taskId;
        this.size = size;
        this.createTime = createTime;
        this.orderId = orderId;
    }
}

export default File;