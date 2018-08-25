import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../../data.service';

declare var $: any;

@Component({
  selector: 'product-list-view',
  templateUrl: './product-list-view.component.html',
  styleUrls: ['./product-list-view.component.css']
})
export class ProductListViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  currentCategory = "";

  products: any = this.dataService.products;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentCategory = params['category'];
          this.dataService.getProductByCategory(this.currentCategory);
        }
      )
  }

  openModal(product) {
    this.dataService.activeProduct.data = product;
    $('.ui.modal')
      .modal('setting', 'closable', false)
      .modal('show');
  }

}
