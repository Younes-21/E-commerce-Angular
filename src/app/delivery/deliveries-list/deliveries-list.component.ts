import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/model/delivery';
import { DeliveryService } from 'src/app/services/delivery.service';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrls: ['./deliveries-list.component.css']
})
export class DeliveriesListComponent implements OnInit {
UserId=localStorage.getItem('UserId');
connecteduserorders:any;
today = new Date();
deliveries?:any;
errormessage?:string;
errormesssage?:string;

deliveriess=[
  {
  product :null,
  start_date :null,
  arrived_date:null,
  }
];
orders?:any;
products?:any;

  constructor(private deliveryService:DeliveryService , private orderService : OrderService , private productService : ProductService) { }

  ngOnInit(): void {

    this.productService.getAll().subscribe(
      data => {
      this.products = data;
      console.log("1")
      },
      err => {
        this.errormesssage = JSON.parse(err.error).message;
        }
      );
    this.orderService.getAllOrders().subscribe(
      data => {
      this.orders = data;
      let orders: any[]=[];
      let z=0;
      for(let i=0;i<this.orders.length;i++){
        if(this.orders[i].user.id == this.UserId){
          orders[z] = this.orders[i];
          z++;
        }
      }
      this.connecteduserorders = orders;
      console.log("connecetd uer orders:",this.connecteduserorders)
      },
      err => {
      this.errormesssage = JSON.parse(err.error).message;
      }
      );
      
    this.deliveryService.getDeliveries().subscribe(
      data => {
      this.deliveries = data;
      console.log("full deliveries here",this.deliveries[0].id)
      let k=0;
      console.log("3")
      for(let i=0;i<this.deliveries.length;i++){
        console.log("4")
         for(let j=0;j<this.connecteduserorders.length;j++){
           if(this.deliveries[i].order.id == this.connecteduserorders[j].id){
              this.deliveriess.push({product : this.connecteduserorders[j].product , start_date : this.deliveries[i].start_date , arrived_date : this.deliveries[i].arrived_date})
           }
         }
      }
      console.log("deliveriess here:",this.deliveriess[1].start_date)
      },
      err => {
      this.errormessage = JSON.parse(err.error).message;
      }
      );
      
  }

  

}
