import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../common/models/Product.model";
import {User} from "../common/models/User.model";
import {Cart} from "../common/models/Cart.model";
import {CartService} from "../common/services/cart.service";
import {Router} from "@angular/router";
import {ToastService} from "angular-toastify";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  router;
  totalPrice: number = 0.00;
  products?: Product[]
  user?: User
  cart?: Cart;
  checkoutForm: any = FormGroup

  constructor(router: Router,private service: CartService,private toastService: ToastService) {
    this.checkoutForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required)
    })
    this.router = router
    let products = sessionStorage.getItem("products")
    if(products) {
      this.products = JSON.parse(products) as Array<Product>
    }
    let user = sessionStorage.getItem("user")
    if(user) {
      this.user = JSON.parse(user) as User
    }
    this.totalPrice = this.sumPrice()
    if(this.products){
      return
    }else{
      this.toastService.error('Your cart is empty!');
        setTimeout(()=>{
          this.router.navigateByUrl("/")
        }, 200);
    }
  }
  deliver(){
    if(this.products)
    if(this.user){
      this.cart={
        user: this.user,
        products: this.products,
        finalPrice: this.sumPrice(),
        time: new Date().toTimeString()
      }
    }else{
      this.cart={
        user: {
          username: "",
          password: "",
          admin: false,
          firstName: this.checkoutForm.controls.firstName.value,
          lastName: this.checkoutForm.controls.lastName.value,
          number: this.checkoutForm.controls.number.value,
          email: this.checkoutForm.controls.email.value,
          address: this.checkoutForm.controls.address.value,
          city: this.checkoutForm.controls.city.value,
        },
        products: this.products,
        finalPrice: this.sumPrice(),
        time: new Date().toTimeString()
      }
    }
    if(this.cart) {
      this.service.createCart(this.cart).subscribe(product => {
        this.toastService.success('Order submitted!');
        setTimeout(()=>{
          this.router.navigateByUrl("/")
        }, 200);
      },error => {
        this.toastService.error('Something went wrong!');
      })
    }
  }
  sumPrice():number{
    let totalPrice = 0.00
    if(this.products)
    for(let i = 0; i < this.products.length;i++){
      totalPrice += this.products[i].price;
    }
    return totalPrice
  }

  popProductFromCart(i: number){
    if(this.products)
    this.products.splice(i, 1);
    this.totalPrice = this.sumPrice()
    sessionStorage.setItem("products",JSON.stringify(this.products));
  }
}
