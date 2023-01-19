export class Product {
    constructor(
        public id : number,
        public name : String,
        public selected_quantity : number,
        public buying_price : number,
        public selling_price : number,
        public stock : number,
        public stock_available : number,
        public weight : number,
        public id_category : number,
        public is_deleted : boolean
            ){}
}
