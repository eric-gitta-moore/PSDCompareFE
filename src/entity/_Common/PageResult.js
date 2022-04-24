/*
 * @Author: Billy
 * @Date: 2022-01-05 01:14:29
 * @LastEditors: Billy
 * @LastEditTime: 2022-01-05 10:29:12
 * @Description: 请输入
 */

class PageResult {
    /**
     * @description 分页获取数据的格式类
     * @param {number} total,数据总数
     * @param {number} size,页面大小
     * @param {number} current ,当前页
     * @param {number} pages , 总页数
     */
    constructor(rows, count,startPages,maxPages,sort) {
        this.rows = rows;
        this.count = count;

        this.startPages = startPages;
        this.maxPages = maxPages;
        this.sort  = sort;
    }
}

export default PageResult;