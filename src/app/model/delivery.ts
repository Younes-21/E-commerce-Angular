import { Order } from "./order";

export class Delivery {
    constructor(
        // public id:number,
         public arrived_date:Date,
         public is_deleted:boolean,
         public start_date : Date,
         public order: Order,
     ){
 
     }
}
