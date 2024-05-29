import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Product} from "../models/Product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://161.97.132.138:8080/products';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url);
  }
  getProduct(productId: String): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${productId}`);
  }

  getProductByType(productType: String): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/type:${productType}`)
  }

  getProductByAdditional(productType: String, additionalParam: String): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/type:${productType}/${additionalParam}`)
  }

  createProduct(product: Product): Observable<number> {
    return this.http.post<number>(this.url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>
    (`${this.url}/${product.id}`, product);
  }

  deleteProduct(productId: String): Observable<void> {
    return this.http.delete<void>
    (`${this.url}/${productId}`);
  }
}
