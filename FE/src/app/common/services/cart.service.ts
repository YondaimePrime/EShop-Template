import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Cart} from "../models/Cart.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private url = 'http://161.97.132.138:8080/cart';

  createCart(cart: Cart): Observable<number>{
    return this.http.post<number>(this.url, cart)
  }
}
