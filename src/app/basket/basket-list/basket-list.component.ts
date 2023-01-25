import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order';
import { bindCallback } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Product } from 'src/app/model/product';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/services/bill.service';
@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css']
})
export class BasketListComponent implements OnInit {
baskets?:any;
users?:any;
today1 = new Date();
today = new Date();
tomorrow =  new Date(this.today1.setDate(this.today1.getDate() + 1));
message:string = '';
submitted = false;
orders?:any;
total : number = 0;
p : number =0;
order?:any;
bill?:any;
orderss?:any;
test?:any;
tt?:any;
// to try
//products?:any;
products : Array<Product> = new Array();
  constructor(private userService: UserService ,private billService: BillService, private basketService: BasketService , private orderService:OrderService , private router:Router ,  private route: ActivatedRoute,) { 
   
  }

  ngOnInit(): void {
    this.basketService.getAllBaskets().subscribe(
      data =>{
        this.baskets = data;
        console.log("basket",this.baskets[0])
       /*console.log("hiiii",this.baskets)
       console.log("heeellooo",this.baskets[0].product[0].images[0].img)*/
       //console.log("notre data ici",this.data.product)
      } 
    )
    this.userService.getUsers().subscribe(
      data =>{
        this.users = data;
        console.log("User",this.users[0])
        console.log("Id user",this.users[0].id)

        console.log("hiiii",this.users)
     /*  console.log("heeellooo",this.baskets[0].product[0].images[0].img)*/
      } 
    )

    this.orderService.getAllOrders().subscribe(
      data =>{
        this.orderss = data;
        console.log("Orders",this.orderss/*[0].product[0].name*/)
      } 
    )
  }
 
  Total(): number{
  //  console.log("le nombre de produit dans le 1er basket:",this.baskets[0].product[0].selected_quantity)
    for(let i=0;i<this.baskets[0].product.length;i++){
      this.total =this.total+(this.baskets[0].product[i].selected_quantity*this.baskets[0].product[i].selling_price); 
    }
   // console.log("ici n :",this.total)
    this.p=this.total;
    this.total=0;
    return this.p;
  }

    addOrder(): void {
      console.log("verifier les produits",this.baskets[0].product)
      this.products = this.baskets[0].product
      /*console.log("ici les produits",this.products[0]);
      this.order = new Order(20,false,new Date(),1,new Date(),'unpaid',this.p,this.users[0],this.products);
      console.log("order dyali",this.order);*/
      let data = {
        "id": 200,
        "delivery_price": 20.0,
        "is_deleted": false,
        "ordered": "2023-01-24T15:08:05.000+00:00",
        "quantity": 1,
        "shipped": "2023-01-24T15:08:05.000+00:00",
        "status": "unpaid",
        "total": 1050.0,
        "user": this.users[0],
        "product":this.products,
    }
      this.orderService.createOrder(data).subscribe(
      response =>{
        this.test = response;
        console.log("myydata:",response);
        //this.test.product.push(this.products)
        console.log("Test",this.test)
      //this.submitted = true;
      //this.router.navigate([{outlets: {primary: 'navbar' ,contenu:'order'}}]);
      },
     /* error => {
      this.message=error.message;
      console.log(error);
      }*/
      );
      //console.log("Dans addOrder : ",this.order)
      //console.log("todaay",this.today);
      //console.log("tomorrow",this.tomorrow);
      }
  
  

}
