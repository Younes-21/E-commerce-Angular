import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Image } from 'src/app/model/image';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product = new Product(0, "", "", 0, 0, 0, 0, 0,[],0,false);
  image = new Image(0, '', false, this.product)
  submitted = false;
  message:string = '';
  selectedCategory: number = 0;
  errorMessage: string = ''
  isLoggedIn=false
  isAdminOrFournisseur = false
  isLoginFailed = false
  allproducts : any;
  categories: any;
  lastproduct : any;
  testproduct:any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllCategories()
    this.getAllProducts()
    //this.verifyAuth()
  }

  createProduct(): void{

   // if(this.isAdminOrFournisseur && this.product.name && this.product.description && this.product.buying_price && this.product.stock && this.product.weight && this.image.img && this.selectedCategory ){
    this.categoryService.getById(this.selectedCategory).subscribe(
      res => {
        let currentCategory = new Category(res.id, res.name, res.is_deleted, res.product)
        this.product.category = currentCategory
        
        this.product.selling_price = this.product.buying_price + this.product.buying_price*0.01
        this.product.stock_available = this.product.stock
        for(let i=0;i<this.allproducts.length;i++){
          this.lastproduct = this.allproducts[i];
         }
         let product = new Product(this.lastproduct.id+1,this.product.name,this.product.description,this.product.buying_price,this.product.selling_price,this.product.stock,this.product.stock_available,this.product.weight,this.product.images,0,false,currentCategory);
        
         this.productService.create(product).subscribe(
          response => {
            this.submitted = true;
            console.log("product response here :",response)
            console.log("this.product :",this.product)
            let image = new Image(this.image.id,this.image.img,false,product)
            console.log("image created",image)
          
            this.imageService.create(image).subscribe(
              res => {
                console.log("res image")
                console.log(res)
                this.router.navigate(['/products']);
              },
              err =>{
                console.log("err image")
                console.log(err)
              }
            )
            // this.router.navigate([{outlets: {primary: 'navbar', contenu: 'products'}}]);
          },
          error => {
            this.message = error.message;
            console.log(error)
          }
        )
      },
      err =>{
        console.log(err)
      }
    )
   // } 
    /* else {
      this.errorMessage = 'Please, verify all the fields';
      this.isLoginFailed = true;
    }
*/
    
  }
  getOneCategorie() : Category |  null{
    
    return null
  }
  
  getAllCategories(){
    this.categoryService.getAll().subscribe(
      res => {
        this.categories = res
      },
      err => {
        console.log(err)
      }
    )
  }

  getAllProducts(){
    this.productService.getAll().subscribe(
      data =>{
        this.allproducts = data;
        console.log("All products here : ",this.allproducts)
            }
    )
  }
  /*verifyAuth(){
    if(this.tokenStorageService.getUsername() != null){
      this.isLoggedIn = true
      if(this.tokenStorageService.getRoles() == "ADMIN" || this.tokenStorageService.getRoles() == "FOURNISSEUR"){
        this.isAdminOrFournisseur = true
      }
      let email = this.tokenStorageService.getUsername()
      if (email) {
        this.userService.getByEmail(email).subscribe(
          res => {
            this.product.fournisseur= res.id
            console.log("res verifyAuth this.product.fournisseur= res.id")
            console.log(res)
            console.log(this.product)
          },
          err => {
            console.log(err)
          }
        )
      }
    }
    console.log("verifyAuth")
    console.log(this.tokenStorageService.getRoles())
  }
*/
}