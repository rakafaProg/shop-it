import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../generic/about/about.component';
import { LoginComponent } from '../generic/login/login.component';
import { SignUpComponent } from '../generic/sign-up/sign-up.component';
import { GenericMainComponent } from '../generic/generic-main/generic-main.component';
import { UserMainComponent } from '../user/user-main/user-main.component';
import { WellcomeComponent } from '../user/wellcome/wellcome.component';
import { ShoppingMainComponent } from '../user/shopping/shopping-main/shopping-main.component';
import { PlaceOrderMainComponent } from '../user/place-order/place-order-main/place-order-main.component';
import { ProfileMainComponent } from '../user/profile/profile-main/profile-main.component';
import { EditUserDetailsComponent } from '../user/profile/edit-user-details/edit-user-details.component';
import { ViewPastOrdersComponent } from '../user/profile/view-past-orders/view-past-orders.component';
import { AdminMainComponent } from '../admin/admin-main/admin-main.component';
import { AdminViewComponent } from '../admin/admin-view/admin-view.component';
import { CreateProductComponent } from '../admin/create-product/create-product.component';
import { ViewUserDetailsComponent } from '../user/profile/view-user-details/view-user-details.component';

const routes: Routes = [
  {
    path: '',
    component: GenericMainComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
    ]
  },
  {
    path: 'happ',
    component: UserMainComponent,
    children: [
      {
        path: '',
        component: WellcomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'shopping/:category',
        component: ShoppingMainComponent
      },
      {
        path: 'shopping',
        redirectTo: 'shopping/1',
        pathMatch: 'full'
      },
      {
        path: 'place-order',
        component: PlaceOrderMainComponent
      },
      {
        path: 'profile',
        component: ProfileMainComponent,
        children: [
          {
            path: '',
            component: ViewUserDetailsComponent
          },
          {
            path: 'edit',
            component: EditUserDetailsComponent
          },
          {
            path: 'orders',
            component: ViewPastOrdersComponent
          }
        ]
      },
    ]
  },
  {
    path: 'admin',
    component: AdminMainComponent,
    children: [
      {
        path: '',
        component: AdminViewComponent
      },
      {
        path: 'new-product',
        component: CreateProductComponent
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
