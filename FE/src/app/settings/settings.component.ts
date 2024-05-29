import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../common/services/user.service";
import {ToastService} from "angular-toastify";
import {User} from "../common/models/User.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  color!: boolean;
  editUserForm: any = FormGroup
  user?: User;

  constructor( private service: UserService,private toastService: ToastService) {
    this.editUserForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      admin: new FormControl(null, Validators.required),
      username: new FormControl(null, [Validators.required,Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8),
        Validators.pattern('\\b(?=[a-z]*[A-Z])(?=[A-Z]*[a-z])[a-zA-Z0-9]+\\b')
      ]),
      firstName: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      email: new FormControl(null, Validators.required),
      number: new FormControl(null, [Validators.required, Validators.minLength(10),
        Validators.pattern('^(?!(.*\\+.*){2})[\\d+]+$')
      ]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required])
    })
    let theme = sessionStorage.getItem("theme")
    if(theme) {
      this.color = JSON.parse(theme) as boolean
    }
    let user = sessionStorage.getItem("user")
    if(user) {
      this.user = JSON.parse(user) as User
      this.editUserForm.setValue(JSON.parse(user) as User)
    }
  }

  editUser(){
    if (this.editUserForm.valid) {
        this.service.updateUser(this.prepareUser()).subscribe(() => {
          sessionStorage.setItem("user", JSON.stringify(this.prepareUser()));
          setTimeout(() => {
            this.toastService.success('Edited user details!');
            setTimeout(() => {
              window.location.replace("/")
            }, 300);
          }, 200);
        })
    }
  }

  prepareUser():User{
    return {
      id:this.user!.id,
      username: this.editUserForm.controls.username.value,
      password: this.editUserForm.controls.password.value,
      firstName: this.editUserForm.controls.firstName.value,
      lastName: this.editUserForm.controls.lastName.value,
      email: this.editUserForm.controls.email.value,
      number: this.editUserForm.controls.number.value,
      address: this.editUserForm.controls.address.value,
      city: this.editUserForm.controls.city.value,
      admin: this.user!.admin
    }
  }

  deleteUser(){
    if(this.user)
      if(this.user.id != undefined)
        if (window.confirm('Do you want to delete your account?')){
          this.service.deleteUser(this.user.id).subscribe(() => {
            setTimeout(() => {
              sessionStorage.clear()
              this.toastService.error('Account deleted.');
              setTimeout(() => {
                window.location.replace("/");
              }, 200);
            }, 200);
          })
        }
  }

  theme(){
    const root = document.documentElement;
    const body = document.getElementsByTagName("body");
    if (this.color){
      root.style.setProperty('--front', '#e3df28');
      root.style.setProperty('--supper', '#503146');
      root.style.setProperty('--back', '#1e0c18');
      root.style.setProperty('--tsupper', 'rgba(80, 49, 70,0.7)');
      root.style.setProperty('--text', '#FFFFFF');
      root.style.setProperty('--text', '#FFFFFF');
      root.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('assets/images/Yellow-Purple.jpg')"
      sessionStorage.setItem("theme", JSON.stringify(false));
      this.color = false
    }else{
      root.style.setProperty('--front', '#00AAFF');
      root.style.setProperty('--supper', '#001242');
      root.style.setProperty('--back', '#000022');
      root.style.setProperty('--tsupper', 'rgba(0, 18, 66,0.7)');
      root.style.setProperty('--text', 'whitesmoke');
      sessionStorage.setItem("theme", JSON.stringify(true));
      root.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('assets/images/TechBackgorund.png')"
      this.color = true
    }
  }
}
