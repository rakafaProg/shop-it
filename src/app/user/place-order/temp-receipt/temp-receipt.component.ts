import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
declare var $: any;

@Component({
  selector: 'temp-receipt',
  templateUrl: './temp-receipt.component.html',
  styleUrls: ['./temp-receipt.component.css']
})
export class TempReceiptComponent implements OnInit {

  constructor(private dataService: DataService) { }
  editedItem: any = null; 
  editedAmount = 0;
  cart: any = this.dataService.cart;

  ngOnInit() {
    $(document).ready(() => {
      $('.four.steps .step.cart')
        .addClass('active').removeClass('disabled');
      $('.four.steps .step.shipping')
        .removeClass('active').addClass('disabled');
      $('.four.steps .step.payment')
        .removeClass('active').addClass('disabled');
      $('.four.steps .step.finish')
        .removeClass('active').addClass('disabled');
    });
  }

  updateAmount() {
    this.dataService.updateCartItemAmount(this.editedItem.code, this.editedAmount);
    this.editedItem = null;
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
