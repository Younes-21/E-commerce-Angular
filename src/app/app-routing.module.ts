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
  {path:'login', component : SigninComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
