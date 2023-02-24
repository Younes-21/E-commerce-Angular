import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*import { AuthComponent } from './auth/auth.component';
import { EmpCreateComponent } from './emp/emp-create/emp-create.component';
import { EmpListComponent } from './emp/emp-list/emp-list.component';
import { NavbarComponent } from './navbar/navbar.component';*/
import { WelcomeComponent } from './welcome/welcome.component';
import {BasketListComponent} from './basket/basket-list/basket-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { SigninComponent } from './login/signin/signin.component';
import { BillsListComponent } from './bill/bills-list/bills-list.component';
import { DeliveriesListComponent } from './delivery/deliveries-list/deliveries-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { FooterComponent } from './footer/footer.component';
const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'login', component: AuthComponent },
  //{ path: 'navbar', component: NavbarComponent },
  //{ path: 'create', component: EmpCreateComponent, outlet: 'contenu' },
  //{ path: 'employees', component: EmpListComponent, outlet: 'contenu' },
  //{ path: 'welcome', component: WelcomeComponent, outlet: 'contenu' },
  //{ path: 'logout', component: AuthComponent }
  {path :'home',component : WelcomeComponent},
  {path: 'basket' , component: BasketListComponent},
  {path: 'order' , component: OrderListComponent},
  {path :'basket/order', component: OrderListComponent},
  {path:'signin', component : SigninComponent},
  {path:'bills',component : BillsListComponent},
  {path:'deliveries',component : DeliveriesListComponent},
  {path:'categories',component: CategoryCreateComponent},
  {path: 'category-list', component : CategoryListComponent},
  {path : 'category-create' ,component : CategoryCreateComponent},
  {path : 'category-edit' , component : CategoryEditComponent},
  {path :'products', component : ProductListComponent},
  {path :'product-detail',component : ProductDetailComponent},
  {path :'product-create' ,component : ProductCreateComponent},
  {path : 'product-edit',component : ProductEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
