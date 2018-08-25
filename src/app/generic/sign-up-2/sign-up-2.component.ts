import { Component, OnInit, Input } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { DataService } from '../../data.service';

declare var $: any;

@Component({
  selector: 'sign-up-2',
  templateUrl: './sign-up-2.component.html',
  styleUrls: ['./sign-up-2.component.css']
})
export class SignUp2Component implements OnInit {
  @Input() user: any;
  cities: any = [];
  invalid = false;
  signupFaild = false;

  constructor(private dataService: DataService) { }


  ngOnInit() {

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
            this.signupFaild = false;
          }
        });
    });
  }

  finishSignup() {
    if (!this.validateForm()) {
      this.invalid = true;
      return;
    }

    this.dataService.signUp({
      user: {
        ...this.user,
        password: Md5.hashStr(this.user.password),
        repeatPassword: Md5.hashStr(this.user.repeatPassword)
      }
    })
      .subscribe(
        res => {
          if (res.json().success == true) {
            const newUrl = res.json().toUrl;
            window.location.href = newUrl;
          } else {
            this.signupFaild = true;
          }
        },
        err => this.signupFaild = true
      );
  }

  validateForm() {
    const { first_name, last_name, city_id, street_name, house_number } = this.user;
    if (!first_name || !last_name || !city_id || !street_name || !house_number) {
      return false;
    }
    return true;
  }

}
