import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/services/bill.service';
import { Delivery } from 'src/app/model/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';

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
  userordersproducts?:any;
  message:string = '';
  submitted = false;
  //userorders: any[] = [];
    constructor(private orderService: OrderService , private userService : UserService , private billService : BillService , private deliveryService : DeliveryService) { }


  ngOnInit(): void {
    
    this.userService.getUsers().subscribe(
      data =>{
        this.users = data;
        this.user = this.users[0];
        console.log("users here :",this.users)
        console.log("connected user :",this.user)

      }
    ),

    this.orderService.getAllOrders().subscribe(
      data =>{
        this.orders = data;
        console.log("all orders:",this.orders[0].status);
        let userorders: any[] = [];
        let k=0;
        for(let i=0;i<this.orders.length;i++){
          if(this.orders[i].status == "unpaid" && this.orders[i].user.id == this.user.id){
            userorders[k]=this.orders[i];
            k++;
          }
        }
        this.userorders = userorders;
        //console.log("user orders let:",userorders);
        console.log("user orders ext :",this.userorders)  
        console.log("pour tester",this.userorders[1].product)  
        let products: any[]=[];
        let z=0;
       // console.log("length:",this.userorders[0].product)
        for(let a=0;a<this.userorders.length;a++){
          for(let j=0;j<this.userorders[a].product.length;j++){
             products[z]=this.userorders[a].product[j];
             z++;
             console.log("ki dkhl")
          }
        }
        this.userordersproducts = products;
        console.log("produuucts:",this.userordersproducts)
      }
    )

  }
  Subtotal(): number{
    //old
   /* for(let i=0;i<this.orders.length;i++){
      this.n =this.n+(this.orders[i].quantity*this.orders[i].product[0].selling_price); 
    }
    console.log("ici n :",this.n)
    this.p=this.n;
    this.n=0;
    return this.p;
    */
   for(let i=0;i<this.userordersproducts.length;i++){
    this.n=this.n+(this.userordersproducts[i].selected_quantity*this.userordersproducts[i].selling_price);
   }
   this.p = this.n;
   this.n=0;
   return this.p;
  }
  
  addBillandDelivery():void{
    console.log("here")
    for(let i=0;i<this.userorders.length;i++){
    let bill = new Bill(this.p+20,false,this.userorders[i]);
    this.billService.createBill(bill).subscribe(
      response =>{
        console.log("myydata:",response);
      //this.submitted = true;
      //this.router.navigate([{outlets: {primary: 'navbar' ,contenu:'order'}}]);
      },
      error => {
      this.message=error.message;
      console.log(error);
      }
      );
    let delivery = new Delivery(new Date(),false,new Date(),this.userorders[i]);
    this.deliveryService.createDelivery(delivery).subscribe(
      res =>{
        console.log("myydata:",res);
      //this.submitted = true;
      //this.router.navigate([{outlets: {primary: 'navbar' ,contenu:'order'}}]);
      },
      error => {
      this.message=error.message;
      console.log(error);
      }
      );
    }
  }
}
