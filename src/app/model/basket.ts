import { DecimalPipe } from "@angular/common";
import { UserService } from '../services/user.service';

export class Basket {
    constructor(
public id : number,
public date : Date,
public total_price : number,
public id_user : number,
public id_product : number,
public is_deleted : boolean
    ){}
    
}
