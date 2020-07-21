import { SharedService } from './../../../services/shared.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Tab } from 'src/app/shared/models/tab.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  tabs: Tab[] = [];

  constructor(private authService: AuthService, private sharedService: SharedService) {

    this.setTabs();

  }

  ngOnInit() {
    // this.authService.getToken().subscribe();
    this.sharedService.getTabs();
  }


  private setTabs(): void {
     this.sharedService.getTabs().subscribe(response => this.tabs = response.tabs);
 }


}
