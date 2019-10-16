export default class Certificate {
    constructor(id = undefined, name = undefined, description = undefined, price = undefined, creationDate = undefined, tags = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.creationDate = creationDate;
        this.tags = tags;
    }
}