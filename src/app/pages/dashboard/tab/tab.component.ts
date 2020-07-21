import { Column } from './../../../shared/models/column.filter';
import { TabConditionComponent } from './tab-condition/tab-condition.component';
import { ChartPieComponent } from './../chart/chart-pie/chart-pie.component';
import { Component, OnInit, ViewChild, Input, QueryList, ViewChildren } from '@angular/core';

import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @ViewChild('chartPieComponent') chartPieComponent: ChartPieComponent;

  @ViewChildren(TabConditionComponent) tabsConditionComponent: QueryList<TabConditionComponent>;

  cols: any[];

  @Input() columns: Column[];
  @Input() tabName: string;
  @Input() tableName: string;

  selectedColumns: Column[];

  selectedColumnsFilter: any[];

  constructor() {

    this.cols = [];

  }

  ngOnInit() {

    this.columns.forEach(col => {
        const objct =   {
         field: col.name.toLowerCase(),
         header: col.name.toLowerCase(),
         type: col.type ? col.type : ''
        };
        this.cols.push(objct);
    });

    this.selectedColumnsFilter = this.cols;

  }

  generateReports() {

    this.tabsConditionComponent.map( t => {
      t.setValues();
    });

    console.log(this.selectedColumns);

    this.chartPieComponent.tableName = this.tableName;
    this.chartPieComponent.allcolumns = this.columns;
    this.chartPieComponent.loadDataSource(this.selectedColumns, this.tabName, this.tableName);
  }

  exportPdf() {
    jsPDF.then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.columns, this.chartPieComponent.clientes);
            doc.save('primengTable.pdf');
        })
    })
}

}
