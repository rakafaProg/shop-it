import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  state = 1;

  ngOnInit() {

  }

  nextFase() {
    this.state = 2;
  }

}
