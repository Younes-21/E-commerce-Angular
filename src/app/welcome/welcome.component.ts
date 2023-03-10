import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  products?:any;
  UserRole=localStorage.getItem('UserRole');
  constructor(private productService : ProductService) { }
  
  ngOnInit(): void {
    
    this.productService.getAll().subscribe(
      
      data =>{
        this.products = data;
        console.log("products",this.products)
        console.log("User roleeeeeeeeeeeee:",this.UserRole)
        
      } 
    )

  }

}
