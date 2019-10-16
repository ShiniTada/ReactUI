export default class User {
    constructor(id = undefined, name = undefined, role = undefined, balance = undefined) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.balance = balance;
    }
}