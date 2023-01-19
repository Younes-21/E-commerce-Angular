import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders?: any;
  n : number = 0;
  p : number =0;

    constructor(private orderService: OrderService) { }


  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      data =>{
        this.orders = data;
      }
    )
    console.log("la longueur d'orders:",this.orders);
  }
  Subtotal(): number{
    console.log("la longueur d'orders:",this.orders)
    for(let i=0;i<this.orders.length;i++){
      this.n =this.n+(this.orders[i].quantity*this.orders[i].product[0].selling_price); 
    }
    console.log("ici n :",this.n)
    this.p=this.n;
    this.n=0;
    return this.p;
    ;
  }
  
}
