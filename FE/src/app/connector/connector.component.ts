import {Component} from '@angular/core';
import {ProductService} from "../common/services/product.service";
import {Product} from "../common/models/Product.model";

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})
export class ConnectorComponent {
  filter?:String;
  additional?: String;
  products?: Product[];
  counter:number = 0;

  constructor(private service: ProductService) {
    let products = sessionStorage.getItem("products")
    if (products) {
      this.products = JSON.parse(products) as Array<Product>
    }
  }
  getProductByAdditional(additional?: String) {
    this.additional = additional
  }

  getProductByType(typ?: String) {
    setTimeout(() => {
      if (typ == undefined) {
        this.service.getProducts().subscribe((products: Array<Product>) => {
          this.products = products;
        });
      } else {
        console.log(this.additional)
        if (this.additional == undefined) {
          this.service.getProductByType(typ).subscribe((products: Array<Product>) => {
            this.products = products;
          });
        } else {
          this.service.getProductByAdditional(typ, this.additional).subscribe((products: Array<Product>) => {
            this.products = products;
          });
        }
      }
    }, 200);
  }
  filterTerm(word: any){
    if(word){
      this.filter = word.toString();
    }else{
      this.filter = " "
    }
  }

  refreshCart(){
    this.counter += 1;
  }
}

