import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'wellcome',
  templateUrl: './wellcome.component.html',
  styleUrls: ['./wellcome.component.css']
})
export class WellcomeComponent implements OnInit {

  constructor(private dataService: DataService) { }
  cart: any = this.dataService.cart;

  userDetails: any = {
    first_name: 'רקפת', 
    status: 2
  }

  ngOnInit() {
    this.dataService.getCart();
  }


}
