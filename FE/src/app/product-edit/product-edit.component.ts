import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../common/services/product.service";
import {Product} from "../common/models/Product.model";
import {User} from "../common/models/User.model";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  editProduct: any = FormGroup;
  router;
  user?:User;
  product?: Product;
  constructor(router: Router,private service: ProductService,private toastService: ToastService) {
    this.editProduct = new FormGroup({
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      count: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    })
    this.router = router;
    let user = sessionStorage.getItem("user")
    if (user) {
      this.user = JSON.parse(user) as User;
    }
    const productId = this.router.url.split('/')[2];
    this.service.getProduct(productId).subscribe((product: Product) => {
      this.product = product;
    setTimeout(() => {
    if (this.product)
      this.editProduct.setValue(this.prepareForm())
    if(this.user && this.user.admin){
      return
    }else{
      this.router.navigateByUrl("/")
    }
    }, 300);
    },error => {
      this.toastService.error('Something went wrong!')
      setTimeout(() => {
        this.router.navigateByUrl("/")
      }, 500);
    });
  }

  prepareForm(){
    return{
      name: this.product?.name,
      type: this.product?.type,
      count: this.product?.count,
      price: this.product?.price,
      description: this.product?.description,
      image: this.product?.img
    }
  }
}
