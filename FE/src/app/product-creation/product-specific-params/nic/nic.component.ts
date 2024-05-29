import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../common/services/product.service";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";
import {Product} from "../../../common/models/Product.model";

@Component({
  selector: 'app-nic',
  templateUrl: './nic.component.html',
  styleUrls: ['./nic.component.css']
})
export class NicComponent {

  nicForm: any = FormGroup
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
    this.nicForm = new FormGroup({
      ports:  new FormControl(null, Validators.required),
      maxSpeed:  new FormControl(null, Validators.required),
      opSys:  new FormControl(null, Validators.required)
    })

  }
  addProduct(){
    if (this.nicForm.valid) {
      const params = new Map<string, string>([
        ["Ports", this.nicForm.controls.ports.value],
        ["Max speed", this.nicForm.controls.maxSpeed.value],
        ["Operating system", this.nicForm.controls.opSys.value]
      ]);
      this.createdProduct = {
        name: this.mainparams.name,
        type: this.mainparams.type,
        count: this.mainparams.count,
        price: this.mainparams.price,
        description: this.mainparams.description,
        img: this.mainparams.img,
        parameters: Object.fromEntries(params)
      }
      this.service.createProduct(this.createdProduct).subscribe(product => {
        this.toastService.success('Product created!');
        setTimeout(() => {
          this.router.navigateByUrl("/")
        }, 200);
      },error => {
        this.toastService.error('Something went wrong!');
      })
    }
  }

}
