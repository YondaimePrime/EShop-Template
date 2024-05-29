import { Component } from '@angular/core';
import {User} from "../common/models/User.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent {
  router;
  user?: User;
  constructor(router: Router) {
    this.router = router
    let user = sessionStorage.getItem("user")
    if (user) {
      this.user = JSON.parse(user) as User;
    }
    if(this.user && this.user.admin){
      return
    }else{
      this.router.navigateByUrl("/")
    }
  }
  generalParams?:any
  genParams(genParams:any){
    this.generalParams = genParams;
  }

}
