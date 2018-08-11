import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './generic/about/about.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './generic/login/login.component';
import { SignUpComponent } from './generic/sign-up/sign-up.component';
import { SignUp2Component } from './generic/sign-up-2/sign-up-2.component';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { WellcomeComponent } from './user/wellcome/wellcome.component';
import { CartComponent } from './user/shopping/cart/cart.component';
import { ProductListViewComponent } from './user/shopping/product-list-view/product-list-view.component';
import { CategoriesHeaderComponent } from './user/shopping/categories-header/categories-header.component';
import { SingleProductViewComponent } from './user/shopping/single-product-view/single-product-view.component';
import { TempReceiptComponent } from './user/place-order/temp-receipt/temp-receipt.component';
import { PrintReceiptComponent } from './user/place-order/print-receipt/print-receipt.component';
import { EditUserDetailsComponent } from './user/profile/edit-user-details/edit-user-details.component';
import { ViewPastOrdersComponent } from './user/profile/view-past-orders/view-past-orders.component';
import { GenericMainComponent } from './generic/generic-main/generic-main.component';
import { UserMainComponent } from './user/user-main/user-main.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { ShoppingMainComponent } from './user/shopping/shopping-main/shopping-main.component';
import { PlaceOrderMainComponent } from './user/place-order/place-order-main/place-order-main.component';
import { ProfileMainComponent } from './user/profile/profile-main/profile-main.component';
import { ViewUserDetailsComponent } from './user/profile/view-user-details/view-user-details.component';
import { Nl2brPipe } from './nl2br.pipe';
import { GetShippingComponent } from './user/place-order/get-shipping/get-shipping.component';
import { GetPaymentComponent } from './user/place-order/get-payment/get-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    SignUpComponent,
    SignUp2Component,
    CreateProductComponent,
    EditProductComponent,
    AdminViewComponent,
    WellcomeComponent,
    CartComponent,
    ProductListViewComponent,
    CategoriesHeaderComponent,
    SingleProductViewComponent,
    TempReceiptComponent,
    PrintReceiptComponent,
    EditUserDetailsComponent,
    ViewPastOrdersComponent,
    GenericMainComponent,
    UserMainComponent,
    AdminMainComponent,
    ShoppingMainComponent,
    PlaceOrderMainComponent,
    ProfileMainComponent,
    ViewUserDetailsComponent,
    Nl2brPipe,
    GetShippingComponent,
    GetPaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
