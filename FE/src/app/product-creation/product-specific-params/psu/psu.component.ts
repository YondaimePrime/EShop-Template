import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../common/models/Product.model";
import {ProductService} from "../../../common/services/product.service";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-psu',
  templateUrl: './psu.component.html',
  styleUrls: ['./psu.component.css']
})
export class PsuComponent {
  router;
  psuForm: any = FormGroup
  createdProduct?: Product
  mainparams?: any
  @Input()
  set mainparam(mainparams: any | undefined) {
    if (mainparams) {
      this.mainparams = mainparams;
    }
  }
  constructor(router: Router,private service: ProductService,private toastService: ToastService) {
    this.router = router
    this.psuForm = new FormGroup({
      plugNumber: new FormControl(null, Validators.required),
      wattage: new FormControl(null, Validators.required),
      modular: new FormControl(null, Validators.required),
      pinNumber: new FormControl(null, Validators.required)
    })

  }
  addProduct(){
    if (this.psuForm.valid) {
      const params = new Map<string, string>([
        ["Number of plugs", this.psuForm.controls.plugNumber.value],
        ["Wattage", this.psuForm.controls.wattage.value],
        ["Modular", this.yesNo()],
        ["Number of pins", this.psuForm.controls.pinNumber.value]
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
        setTimeout(()=>{
          this.router.navigateByUrl("/")
        }, 200);
      },error => {
        this.toastService.error('Something went wrong!');
      })
    }
  }
  yesNo():String{
    if(this.psuForm.controls.modular.value == true){
      return "Yes"
    }else{
      return "No"
    }
  }

}
