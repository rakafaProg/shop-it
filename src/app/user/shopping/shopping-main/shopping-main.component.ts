import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'shopping-main',
  templateUrl: './shopping-main.component.html',
  styleUrls: ['./shopping-main.component.css']
})
export class ShoppingMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {
      $('.menu .item').tab();
    });
  }

  sideBarToggle() {
    $('.ui.sidebar').toggleClass('visible');
  }

}
