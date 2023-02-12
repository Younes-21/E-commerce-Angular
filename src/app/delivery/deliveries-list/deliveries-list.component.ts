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
      //console.log("full products here",this.products)
      console.log("1")
      },
      err => {
        this.errormesssage = JSON.parse(err.error).message;
        }
      );
    this.orderService.getAllOrders().subscribe(
      data => {
      this.orders = data;
      console.log("full orders here",this.orders[0].product)
     console.log("2")
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
  
      let deliveries: any[]=[{
        /*product : null,
        start_date : null,
        arrived_date : null*/
      }]
      let deliveriestoshow1: any[]=[];
      /*type MyArrayType = Array<{start_date: string , arrived_date:string}>;

      const arr: MyArrayType = [{start_date: "" , arrived_date:""}];*/
      for(let i=0;i<this.deliveries.length;i++){
        console.log("4")
         for(let j=0;j<this.orders.length;j++){
           if(this.deliveries[i].order.id == this.orders[j].id){
              this.deliveriess.push({product : this.orders[j].product , start_date : this.deliveries[i].start_date , arrived_date : this.deliveries[i].arrived_date})
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
