import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.css']
})
export class SingleProductViewComponent implements OnInit {
  @Input() product: any;
  amount = 1;
  constructor() { }

  ngOnInit() {
  }

  addToCart() {
    alert(`adding ${this.amount} ${this.product.name} to your cart`);
    this.amount = 1;
  }

}
