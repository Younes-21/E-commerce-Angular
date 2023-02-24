import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  UserRole=localStorage.getItem('UserRole');
  UserId=localStorage.getItem('UserId');


  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  selectedproduct:any;
  connecteduserbasket:any;
  baskets:any;
  panier_product ?: number[];
  product_exist:boolean = false
  users:any;
  products: any;
  allProduct: Array<Product> = new Array();
  validProduct: Array<Product> = new Array();
  productCategory: Array<Product> = new Array();
  testProduct: Array<Product> = new Array();
  errormessage?: string;
  connecteduser:any;
  currentProduct: Product = new Product(0, '', '', 0, 0, 0, 0, 0, [], 0, false);
  currentIndex = -1;
  name = ''
  isAdmin: boolean = false
  isClient: boolean = false
  isFournisseur: boolean = false
  
  current_category?: string | null;
  emptyAllProduct:boolean = false;


  ngOnInit(): void {
   console.log("UserRole product-list:",this.UserRole)
   console.log("UserId product-list:",this.UserId)


   this.productService.getAll().subscribe(
      data => {
        this.products = data;
        this.allProduct.map(item => {
          console.log("this.testProduct")
          console.log(this.testProduct)
          this.testProduct.push(new Product(item.id, item.name, item.description, item.buying_price, item.selling_price, item.stock, item.stock_available, item.weight, item.images, item.selected_quantity, item.is_deleted))
        })
      },
      err => {
        this.errormessage = JSON.parse(err.error).message;
        console.log("ERROR")
      }
    )

    this.userService.getUsers().subscribe(
      data => {
      this.users = data;
      for(let i=0;i<this.users.length;i++){
        if(this.users[i].id == this.UserId){
          this.connecteduser = this.users[i];
          console.log("connected user",this.connecteduser)
        }
      }
      },
      err => {
        console.log(err)
              }
      );
      this.basketService.getAllBaskets().subscribe(
        data => {
        this.baskets = data;
        for(let i=0;i<this.baskets.length;i++){
          if(this.baskets[i].user.id == this.UserId){
            this.connecteduserbasket = this.baskets[i];
            console.log("connected user basket",this.connecteduserbasket)
          }
        }
        },
        err => {
          console.log(err)
                }
        );
  }
  goToProductDetail(id:number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/product-detail'], navigationExtras);
  }
  addToBasket(id:string){
    console.log("fiiha")
    for(let i=0;i<this.products.length;i++){
      if(this.products[i].id == id){
        this.selectedproduct = this.products[i];
      }
    }
    this.connecteduserbasket.product.push(this.selectedproduct)
    console.log("connected user basket after push:",this.connecteduserbasket)
    this.basketService.updateBasket(this.connecteduserbasket.id , this.connecteduserbasket).subscribe(
        res =>{
          console.log("after update data:",res);
          this.router.navigate(['/basket']);

        },
        error => {
        console.log("error here",error);
        }
        );
        
  }


  goToProductCreate(){
    this.router.navigate(['/product-create']);
  }
  editProduct(id:number){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/product-edit'], navigationExtras);
  }
  deleteProduct(id:number){
    this.productService.delete(id).subscribe(
      data => {
        console.log(data);
     window.location.reload();
    }
    )

  }

}