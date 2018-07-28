import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'sign-up-2',
  templateUrl: './sign-up-2.component.html',
  styleUrls: ['./sign-up-2.component.css']
})
export class SignUp2Component implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(() => {

      $('.ui.dropdown')
        .dropdown({
          values: [
            {
              name: 'ירושלים',
              value: '3000'
            },
            {
              name: 'תל אביב',
              value: '4000',
            },
            {
              name: 'חיפה',
              value: '4000',
            },
            {
              name: 'באר שבע',
              value: '4000',
            },
            {
              name: 'ראשון לציון',
              value: '4000',
            },
            {
              name: 'אילת',
              value: '4000',
            },
          ],
          placeholder: 'עיר מגורים'
        })
        ;

    });
  }

}
