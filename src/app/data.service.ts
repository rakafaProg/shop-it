import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:8080/api/';
  //apiUrl = '/api/';

  constructor(private http: Http) { }

  getCities() {
    return this.http.get(this.apiUrl + 'cities');
  }

  signUp(user) {
    return this.http.post('http://localhost:8080/signup', user);
  }

}
