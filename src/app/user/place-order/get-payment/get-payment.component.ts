import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../../data.service';

declare var $: any;

@Component({
  selector: 'get-payment',
  templateUrl: './get-payment.component.html',
  styleUrls: ['./get-payment.component.css']
})
export class GetPaymentComponent implements OnInit {

  constructor(private location: Location, private dataService: DataService) { }

  user: any;


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

    this.user = this.dataService.user;
    console.log(this.user);
    this.user.data = { ...this.dataService.user.data, cardCVC: "", cardNumber: "", cardUser: "", cardDate: "" };
    console.log(this.user);
  }

  onBackClick() {
    this.location.back();
  }

  validateCard() {
    const regexText = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    return (this.user.data.cardNumber || "").match(regexText) ? true : false;
  }

  validateDate() {
    const regexText = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const validation = (this.user.data.cardDate || "").match(regexText);
    if (validation) {
      const Vdate = new Date(+validation[2] + 2000, validation[1] - 1);
      return Vdate >= new Date();
    }
    return false;
  }

  validateCVC() {
    const regexText = /^([0-9]{3})$/;
    return (this.user.data.cardCVC || "").match(regexText);
  }

  formValid() {

    return this.validateDate() && this.validateCard() && this.validateCVC() && this.user.data.cardUser;
  }


}
