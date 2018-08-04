import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartVisible = true;
  constructor() { }

  ngOnInit() {
  }

  toggleVisible() {
    this.cartVisible = !this.cartVisible;
  }

}
