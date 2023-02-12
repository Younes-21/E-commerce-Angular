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
userbasket?:any;
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
        this.userbasket = this.baskets[0];
       /*console.log("hiiii",this.baskets)
       console.log("heeellooo",this.baskets[0].product[0].images[0].img)*/
       //console.log("notre data ici",this.data.product)
      } 
    )
    this.userService.getUsers().subscribe(
      data =>{
        this.users = data;
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
      let data = {
        "id": 200,
        "delivery_price": 20.0,
        "is_deleted": false,
        "ordered": new Date(),
        "quantity": 1,
        "shipped": this.tomorrow,
        "status": "unpaid",
        "total": this.p,
        "user": this.users[0],
        "product":this.products,
    }
      this.orderService.createOrder(data).subscribe(
      response =>{
        this.test = response;
        //localStorage.setItem('OrderID',this.test.id)
      this.router.navigate(['/order']);
          },
      error => {
      this.message=error.message;
      console.log(error);
      }
      );
     
      
      }

      updateBasket(id:number): void{
        console.log("here:D",id)
       // console.log(this.userbasket)
        for(let i=0;i<this.userbasket.product.length;i++){
          if(this.userbasket.product[i].id == id){
            console.log("detected")
            this.userbasket.product[i]=null;
            console.log("produits restants" , this.userbasket.product);
            this.basketService.updateBasket(this.userbasket.id , this.userbasket).subscribe(
              res =>{
                console.log("after update data:",res);
              
              },
              error => {
              this.message=error.message;
              console.log(error);
              }
              );

          }
        }
        window.location.reload();
      }
  

}
