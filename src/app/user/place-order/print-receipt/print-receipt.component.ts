import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
declare var $: any;
@Component({
  selector: 'print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {

  constructor(private dataService: DataService) { }

  cart: any = this.dataService.cart;
  reciptNumber = '10001';

  user = {
    name: 'רקפת יפרח',
    address: 'סן מרטין 22/18 ירושלים',
    phone: '052-727-1196',
    card: 1885
  }

  ngOnInit() {
    $(document).ready(() => {
      $('.four.steps .step.cart')
        .removeClass('active').removeClass('disabled');
      $('.four.steps .step.shipping')
        .removeClass('active').removeClass('disabled');
      $('.four.steps .step.payment')
        .removeClass('active').removeClass('disabled');
      $('.four.steps .step.finish')
        .addClass('active').removeClass('disabled');
    });
  }

  onPrintClick() {
    window.print();
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
