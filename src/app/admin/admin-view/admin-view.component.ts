import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  products = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllProducts().subscribe(
      data => {
        this.products = data.json();
      }
    );
  }

}
