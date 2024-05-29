import { NgModule } from '@angular/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AngularToastifyModule, ToastService} from 'angular-toastify';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { NavbarComponent } from './connector/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { NavLeftComponent } from './connector/navbar/nav-left/nav-left.component';
import { NavMidComponent } from './connector/navbar/nav-mid/nav-mid.component';
import { NavRightComponent } from './connector/navbar/nav-right/nav-right.component';
import { ProductListComponent } from './connector/product-list/product-list.component';
import { ProductComponent } from './connector/product-list/product/product.component';
import { CategoriesComponent } from './connector/categories/categories.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CartComponent } from './connector/cart/cart.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {ConnectorComponent} from "./connector/connector.component";
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { GeneralParamsComponent } from './product-creation/general-params/general-params.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductSpecificParamsComponent } from './product-creation/product-specific-params/product-specific-params.component';
import { PsuComponent } from './product-creation/product-specific-params/psu/psu.component';
import { NicComponent } from './product-creation/product-specific-params/nic/nic.component';
import { MotherboardComponent } from './product-creation/product-specific-params/motherboard/motherboard.component';
import { ProcessorComponent } from './product-creation/product-specific-params/processor/processor.component';
import { DiscComponent } from './product-creation/product-specific-params/disc/disc.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavLeftComponent,
    NavMidComponent,
    NavRightComponent,
    ProductListComponent,
    ProductComponent,
    CategoriesComponent,
    CartComponent,
    LoginComponent,
    ConnectorComponent,
    RegisterComponent,
    SettingsComponent,
    GeneralParamsComponent,
    ProductCreationComponent,
    ProductSpecificParamsComponent,
    PsuComponent,
    NicComponent,
    MotherboardComponent,
    ProcessorComponent,
    DiscComponent,
    ProductEditComponent,
    ProductDetailComponent,
    CheckoutComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    Ng2SearchPipeModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularToastifyModule
  ],
  providers: [ToastService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
