class MenuItem {
    /**
     * 菜单栏按钮对象类
     * @param {number} id 全局唯一路由id
     * @param {string} title 标题
     * @param {string} iconClass 图标的类名(包括 element ui 的图标的类名)
     * @param {string} routerName 按钮对应的路由名称(点击后跳转的目标路由名称)
     * @param {string} routerName 按钮对应的路由名称(点击后跳转的目标路由名称)
     * @param {boolean} active
     * @param {object} params 路由param
     * @param {Array.<MenuItem>} children 子菜单栏对象数组
     */
    constructor({
                    id,
                    title,
                    iconClass,
                    routerName,
                    active = false,
                    params = {},
                    children = []
                }) {
        this.id = id;
        this.title = title;
        this.iconClass = iconClass;
        this.routerName = routerName;
        this.params = params;
        this.children = children;
    }
}

export default MenuItem