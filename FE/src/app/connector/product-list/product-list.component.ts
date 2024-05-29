import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../common/models/Product.model";
import {ProductService} from "../../common/services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products?: Product[]
  filterTerm!:string

  @Input()
  set filterTerms(word: String | undefined) {
    if(word){
      this.filterTerm = word.toString();
    }
  }
  @Output()
  cartRefresh = new EventEmitter<String>();
  refreshCart(){
    this.cartRefresh.emit()
  }
  constructor(private service: ProductService) {
    this.GetProducts()
  }
  GetProducts() {
    this.service.getProducts().subscribe((products: Array<Product>) => {
      this.products = products;
    });
  }
  @Input()
  set productsInput(products: Product[] | undefined) {
    if(products){
      this.products = products;
    }
  }
}
