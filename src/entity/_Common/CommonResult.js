class CommonResult {
    /**
     * @description 通用数据格式类
     * @param {object|Array.<Object>} data 数据
     * @param {string} message 操作信息(一般由后端返回)
     * @param {Number} code 错误码
     */
    constructor(data, message, code) {
        this.data = data;
        this.message = message;
        this.code = code;
    }
}

export default CommonResult;