import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  userName = 'שם משתמש';

  constructor() { }

  ngOnInit() {
  }

}
