import { Product } from "./product";

export class Category {
    constructor(
        public id:number,
        public name : String,
        public is_deleted : boolean,
        public products?:Array<Product>,

    ){}
}
