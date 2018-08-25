import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.css']
})
export class SingleProductViewComponent implements OnInit {
  product: any = this.dataService.activeProduct;
  amount = 1;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  addToCart() {
    this.dataService.addCartItem(this.product.data.code, this.amount);
    this.amount = 1;
  }

  onClose() {
    this.amount = 1;
  }
}
