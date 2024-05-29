import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {ConnectorComponent} from "./connector/connector.component";
import {RegisterComponent} from "./register/register.component";
import {SettingsComponent} from "./settings/settings.component";
import {ProductCreationComponent} from "./product-creation/product-creation.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {CheckoutComponent} from "./checkout/checkout.component";

const routes: Routes = [
  {
    path: '',
    component: ConnectorComponent
  },{
    path: 'login',
    component: LoginComponent
  },{
    path: 'register',
    component: RegisterComponent
  },{
    path: 'settings',
    component: SettingsComponent
  },{
    path: 'addproduct',
    component: ProductCreationComponent
  },{
    path: 'checkout',
    component: CheckoutComponent
  },{
    path: 'editproduct',
    component: ProductEditComponent,
    children:[
      {
        path:'**',
        component: ProductEditComponent,
      }
    ]
  },{
    path: 'detail',
    component: ProductDetailComponent,
    children:[
      {
        path:'**',
        component: ProductDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
