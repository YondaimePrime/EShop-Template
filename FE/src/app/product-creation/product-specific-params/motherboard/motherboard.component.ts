import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../common/services/product.service";
import {ToastService} from "angular-toastify";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../common/models/Product.model";

@Component({
  selector: 'app-motherboard',
  templateUrl: './motherboard.component.html',
  styleUrls: ['./motherboard.component.css']
})
export class MotherboardComponent {

  motherboardForm: any = FormGroup
  createdProduct?: Product
  mainparams?: any
  router;
  @Input()
  set mainparam(mainparams: any | undefined) {
    if (mainparams) {
      this.mainparams = mainparams;
    }
  }
  constructor(router: Router,private service: ProductService,private toastService: ToastService) {
    this.router = router
    this.motherboardForm = new FormGroup({
      socket: new FormControl(null, Validators.required),
      ports: new FormControl(null, Validators.required),
      backlight: new FormControl(null, Validators.required),
      additional: new FormControl(null, Validators.required)

    })

  }
  addProduct(){
    if (this.motherboardForm.valid) {
      const params = new Map<string, string>([
        ["Socket type", this.motherboardForm.controls.socket.value],
        ["Ports", this.motherboardForm.controls.ports.value],
        ["Is backlit", this.yesNo()]
      ]);
      this.createdProduct = {
        name: this.mainparams.name,
        type: this.mainparams.type,
        count: this.mainparams.count,
        price: this.mainparams.price,
        description: this.mainparams.description,
        img: this.mainparams.img,
        additional: this.motherboardForm.controls.additional.value,
        parameters: Object.fromEntries(params)
      }
      this.service.createProduct(this.createdProduct).subscribe(product => {
        this.toastService.success('Product created!');
        setTimeout(() => {
          this.router.navigateByUrl("/")
        }, 200);
      },error => {
        this.toastService.success('Something went wrong!');})
    }
  }
  yesNo():String{
    if(this.motherboardForm.controls.backlight.value == true){
      return "Yes"
    }else{
      return "No"
    }
  }


}
