class User {
    /**
     * 用户模型
     * @param {string} name 用户昵称
     * @param {Number} balance 用户余额
     */
    constructor({
                    name,
                    balance
                }) {
        this.name = name;
        this.balance = balance;
    }
}

export default User