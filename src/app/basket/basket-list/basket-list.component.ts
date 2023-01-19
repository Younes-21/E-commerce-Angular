import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order';
import { bindCallback } from 'rxjs';
@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css']
})
export class BasketListComponent implements OnInit {
baskets?:any;
today1 = new Date();
today = new Date();
tomorrow =  new Date(this.today1.setDate(this.today1.getDate() + 1));
message:string = '';
submitted = false;
orders?:any;
total : number = 0;
p : number =0;
order?:any;
//order = new Order(20,false,new Date(),1,new Date(),'unpaid',this.p,this.baskets[0].product,1);

  constructor(private basketService: BasketService , private orderService:OrderService , private router:Router ,  private route: ActivatedRoute,) { 
   
  }

  ngOnInit(): void {
    this.basketService.getAllBaskets().subscribe(
      data =>{
        this.baskets = data;
        console.log("hello",this.baskets[0])
       /*console.log("hiiii",this.baskets)
       console.log("heeellooo",this.baskets[0].product[0].images[0].img)*/
      } 
    )
   /* this.orderService.getAllOrders().subscribe(
      data =>{
        this.orders = data;
        console.log("Orders:",this.orders)
      }
    )*/
  }
 
  Total(): number{
  //  console.log("le nombre de produit dans le 1er basket:",this.baskets[0].product[0].selected_quantity)
    for(let i=0;i<this.baskets[0].product.length;i++){
      this.total =this.total+(this.baskets[0].product[i].selected_quantity*this.baskets[0].product[i].selling_price); 
    }
   // console.log("ici n :",this.total)
    this.p=this.total;
    this.total=0;
    return this.p;
  }

    addOrder(): void {
      console.log("debut")
      this.order = new Order(20,false,new Date(),1,new Date(),'unpaid',this.p,this.baskets[0].product,1);

      this.orderService.createOrder(this.order).subscribe(
      response => {
        console.log("myydata:",response)
      this.submitted = true;
      this.router.navigate([{outlets: {primary: 'navbar' ,contenu:
      'order'}}]);
      },
      error => {
      this.message=error.message;
      console.log(error);
      });
      console.log("Dans addOrder : ",this.order)
      //console.log("todaay",this.today);
      //console.log("tomorrow",this.tomorrow);
      }
  
  

}
