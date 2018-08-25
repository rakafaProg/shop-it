import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../../data.service';
import { log } from 'util';

declare var $: any;

@Component({
  selector: 'get-shipping',
  templateUrl: './get-shipping.component.html',
  styleUrls: ['./get-shipping.component.css']
})
export class GetShippingComponent implements OnInit {

  constructor(private dataService: DataService, private location: Location) { }

  cities: any = [];
  user: any = {};
  userData: any = {};
  invalid = false;

  takenDates: any = ['22/08/2018', '27/08/2018'];

  filterNonWorkingDays(date) {

    if (date.getDay() >= 6) return [false, 'weekend'];
    const formatedDate = `${t2d(date.getDate())}/${t2d(date.getMonth() + 1)}/${date.getFullYear()}`;
    if (this.takenDates.includes(formatedDate)) return [false, 'taken'];
    return [true, ''];
  }



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

      $('.datePicker').datepicker(
        {
          beforeShowDay: this.filterNonWorkingDays.bind(this),
          minDate: 1, maxDate: "+2M",
        }
      );


    });

    this.dataService.getCities().subscribe(
      cities => {
        this.cities = cities.json();
        this.setCitiesToDropdown();
      }
    );

    this.dataService.getUserDetails().subscribe(
      data => {
        let userData = data.json();
        this.userData = userData;
      },
      err => window.location.href = '/login'
    )
  }

  autoStreet() {
    this.user.street_name = this.userData.street_name;
  }

  autoHouseNumber() {
    this.user.house_number = this.userData.house_number;
  }

  autoCity() {
    this.user.city_id = this.userData.city_id;
    $('.ui.dropdown')
      .dropdown(
        'set selected',
        this.user.city_id
      )
      .dropdown(
        'hide'
      )
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

  onBackClick() {
    this.location.back();
  }

}


var HOLIDAYS = {  // Ontario, Canada holidays
  2017: {
    1: { 1: "New Year's Day" },
    2: { 20: "Family Day" },
    4: { 17: "Easter Monday" },
    5: { 22: "Victoria Day" },
    7: { 1: "Canada Day" },
    8: { 7: "Civic Holiday" },
    9: { 4: "Labour Day" },
    10: { 9: "Thanksgiving" },
    12: { 25: "Christmas", 26: "Boxing Day" }
  }
};

function t2d(num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}
