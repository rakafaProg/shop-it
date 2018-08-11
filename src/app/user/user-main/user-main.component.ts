import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  userName = 'שם משתמש';

  constructor(private dataService: DataService) { }

  cart: any = this.dataService.cart;
  ngOnInit() {
    this.dataService.getCart();
  }

}
