import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'print-receipt',
  templateUrl: './print-receipt.component.html',
  styleUrls: ['./print-receipt.component.css']
})
export class PrintReceiptComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  user: any = this.dataService.user.data;
  lastOrderData: any = this.dataService.lastOrder.data.data;
  lastOrder: any = this.dataService.lastOrder.data.order;


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


    if (!this.lastOrderData.length) {
      this.router.navigate(['/happ'])
      return;
    }
  }

  onPrintClick() {
    window.print();
  }

  cartTotal() {
    let total = 0
    this.lastOrderData.forEach(item => {
      total += item.total;
    });
    return total;
  }

  cartCount() {
    let total = 0
    this.lastOrderData.forEach(item => {
      total += item.amount;
    });
    return total;
  }

}
