import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartVisible = true;
  editedItem = null;
  editedAmount = 0;

  constructor(private dataService: DataService) { }

  cart: any = this.dataService.cart;

  ngOnInit() {
    this.dataService.getCart();
  }

  toggleVisible() {
    this.cartVisible = !this.cartVisible;
  }

  cartTotal() {
    let total = 0
    this.cart.data.forEach(item => {
      total += item.total;
    });
    return total;
  }

  cartCount() {
    let total = 0
    this.cart.data.forEach(item => {
      total += item.amount;
    });
    return total;
  }

  deleteCart() {
    this.dataService.deleteCart();
  }

  updateAmount() {
    this.dataService.updateCartItemAmount(this.editedItem.code, this.editedAmount);
    this.editedItem = null;
  }

  delItem(item) {
    this.dataService.deleteCartItem(item.code);
  }

}
