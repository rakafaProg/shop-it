import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  cart: any = this.dataService.cart;
  user: any = this.dataService.user;

  ngOnInit() {
    this.dataService.getCart();
    this.dataService.getUserDetails();
  }

  deleteCart() {
    this.dataService.deleteCart();
  }

  cartTotal() {
    let total = 0
    this.cart.data.forEach(item => {
      total += item.total;
    });
    return total;
  }

  cartCount() {
    let total = 0
    this.cart.data.forEach(item => {
      total += item.amount;
    });
    return total;
  }

}
