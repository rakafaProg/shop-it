import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'get-payment',
  templateUrl: './get-payment.component.html',
  styleUrls: ['./get-payment.component.css']
})
export class GetPaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $('.four.steps .step.cart')
        .removeClass('active').removeClass('disabled');
      $('.four.steps .step.shipping')
        .removeClass('active').removeClass('disabled');
      $('.four.steps .step.payment')
        .addClass('active').removeClass('disabled');
      $('.four.steps .step.finish')
        .addClass('disabled').removeClass('active');
    });
  }

}
