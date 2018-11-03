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
  userData: any = this.dataService.user;
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

    this.dataService.getUserDetails();

  }

  autoStreet() {
    this.user.street_name_ship = this.userData.data.street_name;
  }

  autoHouseNumber() {
    this.user.house_number_ship = this.userData.data.house_number;
  }

  autoCity() {
    this.user.city_id_ship = this.userData.data.city_id;
    $('.ui.dropdown')
      .dropdown(
        'set selected',
        this.user.city_id_ship
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
            this.user.city_id_ship = text;
            this.dataService.user.data.city_name = value;
            this.invalid = false;
          }
        });

      $(".field .dropdown .menu").css("z-index", "10000002");
    });
  }

  valid() {
    this.dataService.user.data.shipping_date = $(".datePicker").val();
    // console.log(this.user.shipping_date)
    // console.log(`${this.user.street_name_ship} && ${this.user.city_id_ship} && ${this.user.house_number_ship} && ${this.dataService.user.data.shipping_date}`)

    return this.user.street_name_ship && this.user.city_id_ship && this.user.house_number_ship && this.dataService.user.data.shipping_date;
  }

}



function t2d(num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}
