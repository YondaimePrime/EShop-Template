import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-general-params',
  templateUrl: './general-params.component.html',
  styleUrls: ['./general-params.component.css']
})
export class GeneralParamsComponent {
  productForm: any = FormGroup
  @Output()
  genParams = new EventEmitter<any>();
  constructor() {
    this.productForm = new FormGroup({
      type: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      count: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    })
  }
  addProduct(): void {
    if (this.productForm.valid) {
      this.genParams.emit(this.prepareProduct());
    }
  }
  private prepareProduct(){
    return {
      type: this.productForm.controls.type.value,
      name: this.productForm.controls.name.value,
      price: this.productForm.controls.price.value,
      description: this.productForm.controls.description.value,
      count: this.productForm.controls.count.value,
      img: this.productForm.controls.image.value
    };
  }


}
