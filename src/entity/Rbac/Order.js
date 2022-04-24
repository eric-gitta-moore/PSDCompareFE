/**
     * @description 创建订单类
     * @param {string} id 订单id
     * @param {string}status,对比状态
     * @param {string}fee,订单金额
     * @param {string}workCode,
     * @param {string}title,对比组名称
     * @param {string}serialNumber,流水号
     * @param {string}createTime,创建时间
     * @param {string}url,对比结果图片连接
     * @param {string}result，对比结果
 */
class order{
    constructor({id,status,fee,title,serialNumber,createTime,url,result}){
       this.id =  id
       this.status = status
       this.fee = fee
       this.title = title
       this.serialNumber = serialNumber
       this.createTime = createTime
       this.url = url
       this.result = result
    }
}