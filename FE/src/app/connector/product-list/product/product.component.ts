import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../common/models/Product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  product?: Product;
  products?: Product[];
  @Input()
  set productInput(product: Product | undefined) {
    if(product){
      this.product = product;
    }
  }
  @Output()
  cartRefresh = new EventEmitter<String>();

  addToCart(){
    let products = sessionStorage.getItem("products")
    this.cartRefresh.emit()
    if(products) {
      this.products = JSON.parse(products) as Array<Product>
    }
    if(this.products!=null && this.product){
      this.products.push(this.product)
      sessionStorage.setItem("products",JSON.stringify(this.products))
    }else{
      sessionStorage.setItem("products",JSON.stringify([this.product]))
    }
  }
}
