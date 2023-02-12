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
  orders?:any;
  bills?:any;
  errormessage?:string;
  errormesssage?:string;
  products?:any;
  billstoshow?:any;
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
     // console.log("full orders here",this.orders[0].product)
     console.log("2")
      },
      err => {
      this.errormesssage = JSON.parse(err.error).message;
      }
      );
    this.billService.getAll().subscribe(
      data => {
      this.bills = data;
      console.log("3")
      //console.log("full bills here",this.bills[0].total_price)
      //console.log("bills here",this.bills[0].order.id)
      let k=0;
      console.log("4")
      let billstoshoww ={};
      //let billstoshow1 = [];
      let billstoshow1: any[]=[];
      for(let i=0;i<this.bills.length;i++){
        console.log("5")
         for(let j=0;j<this.orders.length;j++){
           if(this.bills[i].order.id == this.orders[j].id){
           //this is the old methode (it works but the new one is better)
           /* billstoshow1[k]=this.orders[j].product;
            console.log("affecté",billstoshow1);
            k++;
            console.log("la valeur de k mtn",k);*/
            this.billss.push({product : this.orders[j].product , delivery_price : this.orders[j].delivery_price , total_paid : this.bills[i].total_price})
            
           }
         }
      }
   //   console.log("billtoshowresultat",billstoshow1)
//this.billstoshoww = billstoshow1;
this.billstoshow = billstoshow1;
//console.log("resultat final billstoshow1",billstoshow1)
//console.log("resultat final this.billstoshow",this.billstoshow)//[0][0])
console.log("biiills",this.billss)
},
      err => {
      this.errormessage = JSON.parse(err.error).message;
      }     
      );
      
      }
      
}
