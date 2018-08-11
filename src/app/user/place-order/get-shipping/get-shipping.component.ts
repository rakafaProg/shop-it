import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
declare var $: any;
@Component({
  selector: 'get-shipping',
  templateUrl: './get-shipping.component.html',
  styleUrls: ['./get-shipping.component.css']
})
export class GetShippingComponent implements OnInit {

  constructor(private dataService: DataService) { }

  cities: any = [];
  user: any = {};
  invalid = false;

  ngOnInit() {
    $(document).ready(() => {
      $('.four.steps .step.cart')
        .removeClass('active').removeClass('disabled');
      $('.four.steps .step.shipping')
        .addClass('active').removeClass('disabled');
      $('.four.steps .step.payment')
        .addClass('disabled').removeClass('active');
      $('.four.steps .step.finish')
        .addClass('disabled').removeClass('active');
    });

    this.dataService.getCities().subscribe(
      cities => {
        this.cities = cities.json();
        this.setCitiesToDropdown();
      }
    );

  }

  setCitiesToDropdown() {
    $(document).ready(() => {
      $('.ui.dropdown')
        .dropdown({
          values: this.cities,
          placeholder: 'עיר מגורים',
          action: 'activate',
          onChange: (text, value) => {
            this.user.city_id = text;
            this.invalid = false;
          }
        });
    });
  }

}
