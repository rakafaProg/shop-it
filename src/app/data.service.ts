import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = environment.serverAdress;

  cart: any = { data: [] };
  search: any = { text: '' };
  products: any = { data: [] };
  user: any = { data: {} };
  activeProduct: any = { data: {} };

  constructor(private http: Http) { }

  getCities() {
    return this.http.get(this.apiUrl + 'api/cities');
  }

  countProducts() {
    return this.http.get(this.apiUrl + 'api/countProducts');
  }

  countOrders() {
    return this.http.get(this.apiUrl + 'api/countOrders');
  }


  signUp(user) {
    return this.http.post(this.apiUrl + 'signup', user);
  }

  login(user) {
    return this.http.post(this.apiUrl + 'login', user);
  }

  getUserDetails() {
    return this.http.get(this.apiUrl + 'api/user')
      .subscribe(
        user => this.user.data = user.json(),
        err => window.location.href = '/login'
      );
  }

  getAllProducts() {
    return this.http.get(this.apiUrl + 'api/products/all');
  }

  getProductDetails(code) {
    return this.http.get(this.apiUrl +  "api/product/" + code);
  }
  

  updateProduct(product, code) {
    return this.http.put(this.apiUrl + 'api/updateProduct/' + code, product);
  }

  createProduct(product) {
    return this.http.post(this.apiUrl + 'api/newProduct', product);
  }

  getCategories() {
    return this.http.get(this.apiUrl + 'api/categories');
  }

  getProductByCategory(category) {
    let url = this.apiUrl + 'api/products/category/' + category;
    if (this.search.text) {
      url = this.apiUrl + 'api/products/search/' + this.search.text;
    }

    this.http.get(url)
      .subscribe(
        data => {
          this.products.data = data.json(),
            err => window.location.href = '/login'
        }
      );

  }

  getCart() {
    this.http.get(this.apiUrl + 'api/cart')
      .subscribe(
        cart => this.cart.data = cart.json(),
        err => window.location.href = '/login'
      );
  }

  updateCartItemAmount(code, amount) {
    console.log('try updarte');
    this.http.put(this.apiUrl + 'api/cartItem', { code, amount })
      .subscribe(
        cart => this.cart.data = cart.json(),
        err => window.location.href = '/login'
      );
  }

  addCartItem(code, amount) {
    this.http.post(this.apiUrl + 'api/cartItem', { code, amount })
      .subscribe(
        cart => this.cart.data = cart.json(),
        err => window.location.href = '/login'
      );
  }

  deleteCartItem(code) {
    this.http.delete(this.apiUrl + 'api/cartItem/' + code)
      .subscribe(
        cart => this.cart.data = cart.json(),
        err => window.location.href = '/login'
      );
  }

  deleteCart() {
    this.http.delete(this.apiUrl + 'api/cart')
      .subscribe(
        cart => this.cart.data = cart.json(),
        err => window.location.href = '/login'
      );
  }

}
