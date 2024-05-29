import {Component, Input} from '@angular/core';
import {Product} from "../../common/models/Product.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  cartList!: Product[];
  totalPrice!: number;
  constructor() {
    this.CartRefresh()
  }
  @Input()
  set cartRefresh(x: any){
    this.CartRefresh();
  }
  CartRefresh(){
    let cartList = sessionStorage.getItem("products")
    if(cartList) {
      this.cartList = JSON.parse(cartList) as Array<Product>
      this.totalPrice = this.sumPrice()
    }
  }
  sumPrice():number{
    let totalPrice = 0.00
    for(let i = 0; i < this.cartList.length;i++){
      totalPrice += this.cartList[i].price;
    }
    return totalPrice
  }

  popProductFromCart(i: number){
    this.cartList.splice(i, 1);
    this.totalPrice = this.sumPrice()
    sessionStorage.setItem("products",JSON.stringify(this.cartList));
  }
}
