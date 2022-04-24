class PageResult {
    /** 
     * 分页获取数据的格式类
     * @param {Array.<Object>} records 数据集合
     * @param {Number} total 数据总数
     * @param {Number} size 页面大小
     * @param {Number} current 当前页面
     * @param {Number} pages 页面总数
     */
    constructor(records, total, size, current, pages) {
        this.records = records;
        this.total = total;
        this.size = size;
        this.current = current;
        this.pages = pages;
    }
}

export default PageResult;