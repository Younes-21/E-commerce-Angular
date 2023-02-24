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
UserId=localStorage.getItem('UserId');
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
connecteduser:any;
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
        for(let i=0;i<this.baskets.length;i++){
          console.log("test icii",this.baskets[i].user.id)
          if(this.baskets[i].user.id == this.UserId){
            this.userbasket = this.baskets[i];
            console.log("userbasket here",this.userbasket)
          }
        }
       
      } 
    )
    this.userService.getUsers().subscribe(
      data =>{
        this.users = data;
        for(let i=0;i<this.users.length;i++){
          if(this.users[i].id == this.UserId){
            this.connecteduser=this.users[i];
          }
                }
      } 
    )

    this.orderService.getAllOrders().subscribe(
      data =>{
        this.orderss = data;
        console.log("Orders",this.orderss)
      } 
    )
  }
 
  Total(): number{
    for(let i=0;i<this.userbasket.product.length;i++){
      this.total =this.total+(this.userbasket.product[i].selected_quantity*this.userbasket.product[i].selling_price); 
    }
    this.p=this.total;
    this.total=0;
    return this.p;
  }

    addOrder(): void {
      console.log("verifier les produits",this.userbasket.product)
      this.products = this.userbasket.product
      let data = {
        "id": 200,
        "delivery_price": 20.0,
        "is_deleted": false,
        "ordered": new Date(),
        "quantity": 1,
        "shipped": this.tomorrow,
        "status": "unpaid",
        "total": this.p,
        "user": this.connecteduser,
        "product":this.products,
    }
      this.orderService.createOrder(data).subscribe(
      response =>{
        this.test = response;
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
