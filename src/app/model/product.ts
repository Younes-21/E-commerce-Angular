import { Image } from "./image";
import { Category } from './category';
export class Product {
    constructor(
        public id : number,
        public name : String,
        public description : String,
        public selected_quantity : number,
        public buying_price : number,
        public selling_price : number,
        public stock : number,
        public stock_available : number,
        public weight : number,
        public is_deleted : boolean,
        public category:Category,
        public images?:Array<Image>,
        //public order?:Array<Object>,
        //public basket?:Array<Basket>

            ){}
}
