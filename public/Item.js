export class ItemList {

    constructor(name, amount, maxAmount){
        this.name = name;
        this.amount = amount;
        this.maxAmount = maxAmount;
    }

    plant(){
        this.amount --;
        return this.name;
    }

    add(amount){
        if(this.amount + amount > this.maxAmount){
            // create new ItemList
        }else {
            this.amount += amount;
        }
    }

}