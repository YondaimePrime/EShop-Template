import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProductService} from "../../../common/services/product.service";
import {ToastService} from "angular-toastify";
import {Product} from "../../../common/models/Product.model";

@Component({
  selector: 'app-disc',
  templateUrl: './disc.component.html',
  styleUrls: ['./disc.component.css']
})
export class DiscComponent {

  discForm: any = FormGroup
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
    this.discForm = new FormGroup({
      discType: new FormControl(null, Validators.required),
      capacity: new FormControl(null, Validators.required),
      lifetime: new FormControl(null, Validators.required),
      additional: new FormControl(null, Validators.required)
    })

  }
  addProduct(){
    if (this.discForm.valid) {
      const params = new Map<string, string>([
        ["Type of disc", this.discForm.controls.discType.value],
        ["Capacity", this.discForm.controls.capacity.value + "GB"],
        ["Lifetime", this.discForm.controls.lifetime.value + "TBW"]
      ]);
      this.createdProduct = {
        name: this.mainparams.name,
        type: this.mainparams.type,
        count: this.mainparams.count,
        price: this.mainparams.price,
        description: this.mainparams.description,
        img: this.mainparams.img,
        additional: this.discForm.controls.additional.value,
        parameters: Object.fromEntries(params)
      }
      this.service.createProduct(this.createdProduct).subscribe(product => {
        this.toastService.success('Product created!');
        setTimeout(() => {
          this.router.navigateByUrl("/")
        }, 200);
      },error =>
        this.toastService.error('Something went wrong!'))
    }
  }


}
