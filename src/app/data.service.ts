import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:8080/';
  //apiUrl = '/api/';

  cart: any = { data: [] };

  constructor(private http: Http) { }

  getCities() {
    return this.http.get(this.apiUrl + 'api/cities');
  }


  signUp(user) {
    return this.http.post(this.apiUrl + 'signup', user);
  }

  login(user) {
    return this.http.post(this.apiUrl + 'login', user);
  }

  createProduct(product) {
    return this.http.post(this.apiUrl + 'api/newProduct', product);
  }

  getCategories() {
    return this.http.get(this.apiUrl + 'api/categories');
  }

  getProductByCategory(category) {
    return this.http.get(this.apiUrl + 'api/products/category/' + category);
  }

  getCart() {
    this.http.get(this.apiUrl + 'api/cart')
      .subscribe(
        cart => this.cart.data = cart.json()
      );
  }

  updateCartItemAmount(code, amount) {
    this.http.put(this.apiUrl + 'api/cartItem', { code, amount })
      .subscribe(
        cart => this.cart.data = cart.json()
      );
  }

  addCartItem(code, amount) {
    this.http.post(this.apiUrl + 'api/cartItem', { code, amount })
      .subscribe(
        cart => this.cart.data = cart.json()
      );
  }

  deleteCartItem(code) {
    this.http.delete(this.apiUrl + 'api/cartItem/' + code)
      .subscribe(
        cart => this.cart.data = cart.json()
      );
  }

  deleteCart() {
    this.http.delete(this.apiUrl + 'api/cart')
      .subscribe(
        cart => this.cart.data = cart.json()
      );
  }

}
