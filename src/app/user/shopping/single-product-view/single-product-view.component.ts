import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.css']
})
export class SingleProductViewComponent implements OnInit {
  @Input() product: any;
  amount = 1;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  addToCart() {
    this.dataService.addCartItem(this.product.code, this.amount);
    this.amount = 1;
  }

}
