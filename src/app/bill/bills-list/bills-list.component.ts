import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/model/bill';
import { BillService } from 'src/app/services/bill.service';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent implements OnInit {
  UserId=localStorage.getItem('UserId');
  orders?:any;
  bills?:any;
  errormessage?:string;
  errormesssage?:string;
  products?:any;
  billstoshow?:any;
  connecteduserorders:any;
  billss=[
    {
    product :null,
    delivery_price :null,
    total_paid:null,
    }
  ];

  constructor(private billService:BillService , private orderService : OrderService , private productService : ProductService) { }
 
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
     console.log("orders",this.orders)
      },
      err => {
      this.errormesssage = JSON.parse(err.error).message;
      }
      );
    this.billService.getAll().subscribe(
      data => {
      this.bills = data;
      console.log("3")
      let k=0;
      console.log("4")
      for(let i=0;i<this.bills.length;i++){
        console.log("5")
         for(let j=0;j<this.connecteduserorders.length;j++){
           if(this.bills[i].order.id == this.connecteduserorders[j].id){
            this.billss.push({product : this.connecteduserorders[j].product , delivery_price : this.connecteduserorders[j].delivery_price , total_paid : this.bills[i].total_price})
            
           }
         }
      }
console.log("biiills",this.billss)
},
      err => {
      this.errormessage = JSON.parse(err.error).message;
      }     
      );
      
      }
      
}
