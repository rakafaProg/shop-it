import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'place-order-main',
  templateUrl: './place-order-main.component.html',
  styleUrls: ['./place-order-main.component.css']
})
export class PlaceOrderMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $('.four.steps .step.cart')
        .addClass('active').removeClass('disabled');
      $('.four.steps .step.shipping')
        .addClass('disabled').removeClass('active');
      $('.four.steps .step.payment')
        .addClass('disabled').removeClass('active');
      $('.four.steps .step.finish')
        .addClass('disabled').removeClass('active');
    });
  }

}
