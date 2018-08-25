import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'get-payment',
  templateUrl: './get-payment.component.html',
  styleUrls: ['./get-payment.component.css']
})
export class GetPaymentComponent implements OnInit {

  constructor(private location: Location) { }

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

  onBackClick() {
    this.location.back();
  }

}
