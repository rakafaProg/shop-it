import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'product-list-view',
  templateUrl: './product-list-view.component.html',
  styleUrls: ['./product-list-view.component.css']
})
export class ProductListViewComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  currentCategoy = "";

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.currentCategoy = params['category'];
      }
    )
  }

}
