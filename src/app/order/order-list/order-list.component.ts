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

    constructor(private orderService: OrderService) { }


  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      data =>{
        this.orders = data;
      }
    )
  }

}
