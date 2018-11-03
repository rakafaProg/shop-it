import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = environment.serverAdress;

  cart: any = { data: [] };
  lastOrder: any = { data: { order: {}, data: [] } }
  search: any = { text: '' };
  products: any = { data: [] };
  user: any = { data: {} };
  activeProduct: any = { data: {} };

  constructor(private http: Http) {

  }

  Date_toYMD(dt) {
    var year, month, day;
    year = String(dt.getFullYear());
    month = String(dt.getMonth() + 1);
    if (month.length == 1) {
      month = "0" + month;
    }
    day = String(dt.getDate());
    if (day.length == 1) {
      day = "0" + day;
    }
    return year + "-" + month + "-" + day;

  }

  getCities() {
    return this.http.get(this.apiUrl + 'api/cities');
  }

  countProducts() {
    return this.http.get(this.apiUrl + 'api/countProducts');
  }

  countOrders() {
    return this.http.get(this.apiUrl + 'api/countOrders');
  }

  isIdTaken(id) {
    return this.http.get(this.apiUrl + 'api/isValidId/' + id);
  }


  signUp(user) {
    return this.http.post(this.apiUrl + 'signup', user);
  }

  login(user) {
    return this.http.post(this.apiUrl + 'login', user);
  }

  logout() {
    return this.http.get(this.apiUrl + "logout").subscribe(
      () => {
        setTimeout(() => {
          console.log("timeout");
          window.location.href = '/about';
        }, 400);
      }
    );
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
    return this.http.get(this.apiUrl + "api/product/" + code);
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


  getTakenDates() {
    return this.http.get(this.apiUrl + 'api/takenDates');
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

  placeOrder(callback) {
    const userData = this.user.data;
    const orderData = {
      street: `${userData.street_name_ship}, ${userData.house_number_ship}`,
      credit_card: userData.cardNumber.substring(userData.cardNumber.length - 4),
      order_date: this.Date_toYMD(new Date()),
      delivery_date: userData.shipping_date,
      city: userData.city_id_ship
    };

    this.http.post(this.apiUrl + 'api/placeOrder', orderData)
      .subscribe(
        order => {
          callback();
          this.lastOrder.data = order.json()
        },
        err => console.log(err)
      );
  }

  getLastOrder() {
    this.http.get(this.apiUrl + 'api/lastOrder')
      .subscribe(
        order => {
          this.lastOrder.data = order.json()
        },
        err => window.location.href = '/login'
      );
  }




}
