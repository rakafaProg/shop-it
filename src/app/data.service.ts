import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:8080/';
  //apiUrl = '/api/';

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

}
