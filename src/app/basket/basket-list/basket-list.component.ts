import { Component, OnInit } from '@angular/core';
import { Basket } from 'src/app/model/basket';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css']
})
export class BasketListComponent implements OnInit {
baskets?:any;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketService.getAllBaskets().subscribe(
      data =>{
        this.baskets = data;
      }
    )
  }

}
