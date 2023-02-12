import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { AuthComponent } from './auth/auth.component';
import { BasketListComponent } from './basket/basket-list/basket-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import { BillsListComponent } from './bill/bills-list/bills-list.component';
import { DeliveriesListComponent } from './delivery/deliveries-list/deliveries-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductCreateComponent,
    AuthComponent,
    BasketListComponent,
    OrderListComponent,
    FooterComponent,
    SearchbarComponent,
    SigninComponent,
    SignupComponent,
    BillsListComponent,
    DeliveriesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
