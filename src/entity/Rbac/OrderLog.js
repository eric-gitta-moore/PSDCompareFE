import File from "@/entity/Rbac/File";

class OrderLog {
    constructor({
                    id,
                    status,
                    fee,
                    workCode,
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
                }) {
        if (files.length > 0 && !(files[0] instanceof File)) {
            throw new Error('files不是File类');
        }
        this.id = id;
        this.status = status;
        this.fee = fee;
        this.workCode = workCode;
        this.title = title;
        this.serialNumber = serialNumber;
        this.createTime = createTime;
        this.url = url;
        this.size = size;
        this.resolution = resolution;
        this.taskId = taskId;
        this.resolution = resolution;
        this.result = result;
        this.fileName = fileName;
    }
}

export default OrderLog;