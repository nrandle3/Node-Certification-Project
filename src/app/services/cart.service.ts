import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iproduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Iproduct[] = [];
  user: any;

  constructor(private http: HttpClient) { }

  addToCart(product: Iproduct) {
    if (window.localStorage.getItem("cart")) {
      this.cart = JSON.parse(window.localStorage.getItem("cart") || "");
    }
    this.cart.push(product);
    window.localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getCart(): Iproduct[] {
    if (window.localStorage.getItem("cart")) {
      this.cart = JSON.parse(window.localStorage.getItem("cart") || "");
    }
    console.log(this.cart)
    return this.cart;
  }

  //add http post to place order
  placeOrder() {
    this.http.get("http://localhost:3000/api/v1/whoami", { headers: { "Authorization": window.localStorage.getItem("token") || "" } }).subscribe((response: any) => {
      this.user = response;
    })
    const formData = new FormData();
    formData.append("user", this.user);
    formData.append("cart", JSON.stringify(this.cart));

    this.http.post("http://localhost:3000/api/v1/order", formData);
  }
  removeItem<T>(arr: Array<T>, value: T): Array<T> {
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  deleteItem(i: number) {
    if (window.localStorage.getItem("cart")) {
      this.cart = JSON.parse(window.localStorage.getItem("cart") || "");
    }
    this.removeItem(this.cart, this.cart[i]);
    window.localStorage.setItem("cart", JSON.stringify(this.cart))
    window.location.reload();
  }

  clearCart() {
    this.cart = []
    window.localStorage.setItem("cart", JSON.stringify(this.cart))
  }
}


