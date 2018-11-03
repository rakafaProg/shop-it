import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  userName = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  logout() {
    this.dataService.logout();
  }

}
