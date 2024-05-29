import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../common/services/product.service";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";
import {Product} from "../../../common/models/Product.model";


@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent {
  router;
  processorForm: any = FormGroup
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
    this.processorForm = new FormGroup({
      series: new FormControl(null, Validators.required),
      cores: new FormControl(null, Validators.required),
      threads: new FormControl(null, Validators.required),
      socket: new FormControl(null, Validators.required),
      additional: new FormControl(null, Validators.required)
    })

  }
  addProduct(){
    if (this.processorForm.valid) {
      const params = new Map<string, string>([
        ["Series", this.processorForm.controls.series.value],
        ["Number of cores", this.processorForm.controls.cores.value],
        ["Number of threads", this.processorForm.controls.threads.value],
        ["Socket type", this.processorForm.controls.socket.value]
      ]);
      this.createdProduct = {
        name: this.mainparams.name,
        type: this.mainparams.type,
        count: this.mainparams.count,
        price: this.mainparams.price,
        description: this.mainparams.description,
        img: this.mainparams.img,
        additional: this.processorForm.controls.additional.value,
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
