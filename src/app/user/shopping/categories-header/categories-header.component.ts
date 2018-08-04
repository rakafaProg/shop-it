import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
declare var $: any;

@Component({
  selector: 'categories-header',
  templateUrl: './categories-header.component.html',
  styleUrls: ['./categories-header.component.css']
})
export class CategoriesHeaderComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  currentCategoy = 1;


  categories = [
    { text: 'מומלצים', code: '1' },
    { text: 'משחקי חברה', code: '2' },
    { text: 'בובות פרווה', code: '3' },
    { text: 'ארנקים', code: '4' },
    { text: 'ניקי', code: '5' },
    { text: 'רחפנים', code: '6' },
    { text: 'בובות תינוק', code: '7' },
    { text: 'קופסאות אוכל', code: '8' },
    { text: 'מכשירי כתיבה', code: '9' },
    { text: 'תכשיטים', code: '10' },
    { text: 'פיות', code: '11' },
    { text: 'ספלים', code: '12' },
  ];

  ngOnInit() {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.currentCategoy = params['category'];
          $(document).ready(() => {
            $(`.secondary.vertical.pointing .item`).removeClass('active');
            $(`.secondary.vertical.pointing .item[href$='/${this.currentCategoy}']`).addClass('active');
          });
          console.log(params);
        }
      )
  }

}
