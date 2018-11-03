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

  takenDates: any = [];
  //22/08/2018   2018-08-22
  filterNonWorkingDays(date) {

    if (date.getDay() >= 6) return [false, 'weekend'];
    const formatedDate = `${date.getFullYear()}-${t2d(date.getMonth() + 1)}-${t2d(date.getDate())}`;
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
    });

    this.dataService.getTakenDates().subscribe(
      data => {
        this.takenDates = data.json().map(item => item.delivery_date);
        this.initDatePicker();
      });

    this.dataService.getCities().subscribe(
      cities => {
        this.cities = cities.json();
        this.setCitiesToDropdown();
      }
    );

    this.dataService.getUserDetails();

  }

  initDatePicker() {
    $(document).ready(() => {
      $('.datePicker').datepicker(
        {
          beforeShowDay: this.filterNonWorkingDays.bind(this),
          minDate: 1, maxDate: "+2M",
          dateFormat: "yy-mm-dd"
        }
      );
    });
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
            this.user.city_name_ship = value;
            //this.dataService.user.data.city_name = value;
            this.invalid = false;
          }
        });

      $(".field .dropdown .menu").css("z-index", "10000002");
    });
  }

  valid() {
    return this.user.street_name_ship && this.user.city_id_ship && this.user.house_number_ship && this.isShippingValid();
  }

  isShippingValid() {
    this.dataService.user.data.shipping_date = $(".datePicker").val();
    return (this.dataService.user.data.shipping_date ? true : false);
  }


  saveData() {
    this.dataService.user.data = { ...this.dataService.user.data, ...this.user };
  }

}




function t2d(num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}
