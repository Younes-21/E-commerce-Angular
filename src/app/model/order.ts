import { Product } from "./product";

export class Order {
    constructor(
       // public id:number,
        public delivery_price:number,
        public is_deleted:boolean,
        public ordered:Date,
        public quantity:number,
        public shipped:Date,
        public status:String,
        public total:number,
        public product:Product[],
        public id_user:number,
        //public id_bill:number,
       // public id_delivery:number
    ){

    }
}
