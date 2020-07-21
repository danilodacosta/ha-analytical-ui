import { BreadCrumbItem } from './../../models/bread-crumb-Item.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {


  @Input() breadCrumbItems: Array<BreadCrumbItem> = [];

  // tslint:disable-next-line: no-input-rename
  @Input('page-title') pageTitle: string;
  // tslint:disable-next-line: no-input-rename
  @Input('show-button') showButton = true;
  // tslint:disable-next-line: no-input-rename
  @Input('button-class') buttonClass: string;
   // tslint:disable-next-line: no-input-rename
  @Input('button-text') buttonText: string;
  // tslint:disable-next-line: no-input-rename
  @Input('button-link') buttonLink: string;

  constructor() { }

  ngOnInit() {
  }

}
