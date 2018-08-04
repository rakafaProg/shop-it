import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

declare var $: any;

@Component({
  selector: 'create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(private dataService: DataService) { }

  status = 0;
  product: any = {};
  categories: any = [];
  checkedCategories: any = {};

  ngOnInit() {
    this.dataService.getCategories().subscribe(
      categories => {
        this.categories = categories.json();
        $(document).ready(() => {
          $('.ui.checkbox').checkbox();
        });
      }
    );
  }

  newProduct() {
    this.checkedCategories = {};
    this.product = {};
    this.status = 0;
  }

  sendForm() {
    alert('sending Form');
    this.status = 1;
    this.dataService.createProduct({ product: this.product, categories: this.checkedCategories })
      .subscribe(
        res => {
          console.log(res.json);
          if (res.json().success) {
            this.status = 2;
          } else {
            this.status = 3;
          }
        },
        err => {
          this.status = 3;
          console.log(err);
        }
      )
  }

  validate() {
    if (
      this.product.code &&
      this.product.details &&
      this.product.name &&
      this.product.price &&
      this.product.imageUrl
    ) {
      return true;
    }
    return false;
  }

}
