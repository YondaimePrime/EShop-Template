import { Component } from '@angular/core';
import {User} from "../../../common/models/User.model";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.css']
})
export class NavRightComponent {
  user?: User;
  constructor(private toastService: ToastService) {
    let user = sessionStorage.getItem("user")
    if (user) {
      this.user = JSON.parse(user) as User
    }
  }
  cart(){
    document.getElementsByClassName("cart")[0].classList.toggle("carttranslation")
    document.getElementsByClassName("cartIcon")[0].classList.toggle("invisible")
    document.getElementsByClassName("cartIcon")[1].classList.toggle("invisible")
  }

  logOut(){
    sessionStorage.clear()
    this.toastService.success('Logged out!');
    setTimeout(() => {
      window.location.replace("/")
    }, 500);
  }
}
