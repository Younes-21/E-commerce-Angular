import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/services/bill.service';
import { Delivery } from 'src/app/model/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { Basket } from 'src/app/model/basket';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  
  user?:any;
  users?:any;
  orders?: any;
  n : number = 0;
  p : number =0;
  userorders?:any;
  userorderss?:any;
  userordersproducts?:any;
  message:string = '';
  submitted = false;
  today = new Date();
  arrivedate =  new Date(this.today.setDate(this.today.getDate() + 5));
  baskets?:any;
  userbasket?:any;
  test?:any;
  products?:any;
  producttodecrement?:any;
  //userorders: any[] = [];
    constructor(private orderService: OrderService , private userService : UserService , private billService : BillService , private deliveryService : DeliveryService , private basketService : BasketService,private productService:ProductService , private router:Router ,  private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.productService.getAll().subscribe(
      data =>{
        this.products = data;
        console.log("All products here : ",this.products)
            }
    ),

    
    this.userService.getUsers().subscribe(
      data =>{
        this.users = data;
        this.user = this.users[0];
        console.log("users here :",this.users)
        console.log("connected user :",this.user)

      }
    ),
// c'est icii
    this.orderService.getAllOrders().subscribe(
      data =>{
        this.orders = data;
        console.log("all orders:",this.orders[0].status);
       // let userorders: any[] = [];
        let k=0;
        for(let i=0;i<this.orders.length;i++){
          if(this.orders[i].status == "unpaid" && this.orders[i].user.id == this.user.id){
          //  userorders[k]=this.orders[i];
            //k++;
            this.userorderss = this.orders[i];
          }
        }
        console.log("my order :",this.userorderss.product)
        //this.userorders = userorders;
       // console.log("user orders ext :",this.userorders)  
        //console.log("pour tester",this.userorders[1].product)  
        let products: any[]=[];
        let z=0;
        /*for(let a=0;a<this.userorders.length;a++){
          for(let j=0;j<this.userorders[a].product.length;j++){
             products[z]=this.userorders[a].product[j];
             z++;
             console.log("ki dkhl")
          }
        }*/
        for(let j=0;j<this.userorderss.product.length;j++){
          products[z]=this.userorderss.product[j];
          z++;
        }
        this.userordersproducts = products;
        console.log("produuucts:",this.userordersproducts)
      }
    ),
    this.basketService.getAllBaskets().subscribe(
      data =>{
        this.baskets = data;
        console.log("baskets here", this.baskets[0].user.id)
      let l=0;
      for(let r=0;r<this.baskets.length;r++){
        if(this.baskets[r].user.id == this.user.id){
          console.log("fouund");
          this.userbasket = this.baskets[r];
          console.log("user basket:",this.userbasket)
          //this.test = this.userbasket;
          //this.test.product = null;
          //console.log("test variable :",this.test)

        }
      }
      }
    )

  }
  Subtotal(): number{
   for(let i=0;i<this.userordersproducts.length;i++){
    this.n=this.n+(this.userordersproducts[i].selected_quantity*this.userordersproducts[i].selling_price);
   }
   this.p = this.n;
   this.n=0;
   return this.p;
  }
  
  addBillandDelivery():void{
    console.log("here")
    //for(let i=0;i<this.userorders.length;i++){
    let bill = new Bill(this.p+20,false,this.userorderss);
    this.billService.createBill(bill).subscribe(
      response =>{
        console.log("myydata:",response);
      
      },
      error => {
      this.message=error.message;
      console.log(error);
      }
      );
    let delivery = new Delivery(this.arrivedate,false,new Date(),this.userorderss);
    this.deliveryService.createDelivery(delivery).subscribe(
      res =>{
        console.log("myydata:",res);
      
      },
      error => {
      this.message=error.message;
      console.log(error);
      }
      );
      this.userbasket.product = null;
      this.basketService.updateBasket(this.userbasket.id , this.userbasket).subscribe(
        res =>{
          console.log("after update data:",res);
        
        },
        error => {
        this.message=error.message;
        console.log(error);
        }
        );
        this.userorderss.status="paid";
        this.orderService.updateOrder(this.userorderss.id , this.userorderss).subscribe(
          res =>{
            console.log("after update data:",res);
          
          },
          error => {
          this.message=error.message;
          console.log(error);
          }
          );
          this.producttodecrement = this.userorderss.product;
          console.log("updaate",this.producttodecrement);
          for(let g=0;g<this.producttodecrement.length;g++){
            for(let o=0;o<this.products.length;o++){
              if(this.producttodecrement[g].id == this.products[o].id){
            this.products[o].stock_available = this.products[o].stock_available-this.products[o].selected_quantity; 
            this.productService.updateProduct(this.products[o].id , this.products[o]).subscribe(
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
          }

   // }
    this.router.navigate(['/bills']);

  }
}
