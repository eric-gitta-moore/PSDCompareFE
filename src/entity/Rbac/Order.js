// <<<<<<< HEAD
// /**
//      * @description 创建订单类
//      * @param {string} id 订单id
//      * @param {string}status,对比状态
//      * @param {string}fee,订单金额
//      * @param {string}workCode,
//      * @param {string}title,对比组名称
//      * @param {string}serialNumber,流水号
//      * @param {string}createTime,创建时间
//      * @param {string}url,对比结果图片连接
//      * @param {string}result，对比结果
//  */
// class order{
//     constructor({id,status,fee,title,serialNumber,createTime,url,result}){
//        this.id =  id
//        this.status = status
//        this.fee = fee
//        this.title = title
//        this.serialNumber = serialNumber
//        this.createTime = createTime
//        this.url = url
//        this.result = result
//     }
// }
// =======
import File from "@/entity/Rbac/File";

class Order {
    /**
     * 订单实体，对比组实体
     * @param {Number} id 订单记录id
     * @param {'complete'|'incomplete'} status 订单状态:complete 已完成,incomplete 未完成
     * @param {Number} fee 应付金额
     * @param {string} title 订单名称
     * @param {string} serialNumber 流水号
     * @param {string} createTime 创建时间
     * @param {string} url 对比之后的文件的位置
     * @param {string} size 文件大小，用mb做单位
     * @param {string} resolution 图片分辨率
     * @param {Number} taskId 任务组id
     * @param {string} result 对比结果
     * @param {string} fileName 对比后的文件名
     * @param {Array.<File>} files 任务组下面的对比文件
     */
    constructor({
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
                }) {
        // if (files.length > 0 && !(files[0] instanceof File)) {
        //     throw new Error('files不是File类');
        // }
        this.id = id;
        this.status = status;
        this.fee = fee;
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
        this.files = files;
    }
}

export default Order;
