import { DecimalPipe } from "@angular/common";
import { UserService } from '../services/user.service';
import { User } from "./user";
import { Product } from "./product";
export class Basket {
    constructor(
public id : number,
public date : Date,
public total_price : number,
/*public id_user : number,
public id_product : number,*/
public user : User,
public products:Array<Product>,
public is_deleted : boolean 

   ){}
    
}
