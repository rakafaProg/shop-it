import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {

  constructor() { }

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

}
