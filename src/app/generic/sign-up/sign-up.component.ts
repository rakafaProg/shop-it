import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
declare var $: any;

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private dataService: DataService) { }

  state = 1;
  invalid = false;
  user: any = {};
  isTakenId = false;

  ngOnInit() {

  }

  nextFase() {


    if (
      !this.isTakenId &&
      this.validateID() &&
      this.validateEmail() &&
      this.user.phone && this.user.phone.length >= 11 &&
      this.user.password && this.user.password.length >= 8 &&
      this.user.repeatPassword === this.user.password
    ) {
      this.invalid = false;
      this.state = 2;
    } else {
      this.invalid = true;
    }

  }


  validateID() {
    const id = this.user.id;
    if (id && id.length == 9) {
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        if (!isNaN(id.charAt(i))) {
          const temp = id.charAt(i) * (i % 2 == 0 ? 1 : 2);
          sum += (Math.floor(temp / 10) + temp % 10);
        }
      }
      return (sum % 10 == 0);
    }
    return false;
  }

  takenId() {
    if (!this.validateID()) {
      this.isTakenId = false;
    } else {
      this.dataService.isIdTaken(this.user.id)
        .subscribe(
          data => this.isTakenId = !(data.json().valid)
        );
    }
  }

  validateEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.user.email).toLowerCase());
  }

  validateRepeatPassword() {
    return !this.user.repeatPassword || this.user.password === this.user.repeatPassword;
  }

  addDashes() {
    this.invalid = false;
    const f_val = this.user.phone.replace(/[^0-9]+/g, '');
    this.user.phone = f_val.slice(0, 3);
    if (f_val.length > 3)
      this.user.phone += "-" + (f_val.slice(3, 6));
    if (f_val.length > 6)
      this.user.phone += "-" + (f_val.slice(6, 10));

    $('input[type="tel"]').val(this.user.phone);
  }
}
