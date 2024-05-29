import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../common/services/user.service";
import {User} from "../common/models/User.model";
import {ToastService} from "angular-toastify";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any = FormGroup
  router;
  constructor( private service: UserService,private toastService: ToastService, router: Router) {
    this.router = router
    this.loginForm = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(8),
        Validators.pattern('\\b(?=[a-z]*[A-Z])(?=[A-Z]*[a-z])[a-zA-Z0-9]+\\b')
      ]),
      email: new FormControl(null, Validators.required),
    })
  }
  user?: User;
  checkUser() {
    if (this.loginForm.valid) {
      this.service.getUser(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe((user: User) => {
        this.user = user
        sessionStorage.setItem("user", JSON.stringify(this.user));
        setTimeout(() => {
          if (this.user != undefined) {
            this.toastService.success('Logged in!');
            setTimeout(() => {
              window.location.replace("/")
            }, 300);
          }
        }, 200);
      },(error)=>
        this.toastService.error('Wrong credentials!'))
    }
  }
}
