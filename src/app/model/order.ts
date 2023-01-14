export class Order {
    constructor(
        private id:number,
        private delivery_price:number,
        private is_deleted:boolean,
        private ordered:String,
        private quantity:number,
        private shipped:String,
        private status:String,
        private total:number,
        private id_bill:number,
        private id_delivery:number,
        private id_user:number 
    ){

    }
}
