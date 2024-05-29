import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "angular-toastify";
import {UserService} from "../common/services/user.service";
import {User} from "../common/models/User.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm: any = FormGroup

  constructor( private service: UserService,private toastService: ToastService) {

    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required,Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8),
        Validators.pattern('\\b(?=[a-z]*[A-Z])(?=[A-Z]*[a-z])[a-zA-Z0-9]+\\b')
      ]),
      repassword: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      firstName: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      email: new FormControl(null, Validators.required),
      number: new FormControl(null, [Validators.required, Validators.minLength(10),
        Validators.pattern('^(?!(.*\\+.*){2})[\\d+]+$')
      ]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required])
    })
  }

  registerUser(){
    if (this.registerForm.valid) {
      if (this.registerForm.controls.password.value == this.registerForm.controls.repassword.value) {
        this.service.createUser(this.prepareUser()).subscribe(person => {
          sessionStorage.setItem("user", JSON.stringify(person));
          setTimeout(() => {
            this.toastService.success('Registered and logged in!');
            setTimeout(() => {
              window.location.replace("/")
            }, 300);
          }, 200);
        },(error)=>
          this.toastService.error('Something went wrong!'))
      }
    }
  }

  prepareUser():User{
    return {
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value,
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      email: this.registerForm.controls.email.value,
      number: this.registerForm.controls.number.value,
      address: this.registerForm.controls.address.value,
      city: this.registerForm.controls.city.value,
      admin: false
    }
  }
}

