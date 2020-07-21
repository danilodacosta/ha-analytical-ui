import { DashboardComponent } from './dashboard/dashboard.component';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import {MultiSelectModule} from 'primeng/multiselect';
import {TabViewModule} from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import { ChartPieComponent } from './chart/chart-pie/chart-pie.component';

import { NgxEchartsModule } from 'ngx-echarts';
import {TableModule} from 'primeng/table';
import { TabComponent } from './tab/tab.component';

import {ButtonModule} from 'primeng/button';
import { TabConditionComponent } from './tab/tab-condition/tab-condition.component';

@NgModule({
  declarations: [DashboardComponent, ChartPieComponent, TabComponent, TabConditionComponent],
  imports: [
    FormsModule,
    SharedModule,
    DashBoardRoutingModule,
    MultiSelectModule,
    TabViewModule,
    ChartModule,
    CardModule,
    ButtonModule,
    TableModule,
    NgxEchartsModule

  ]
})
export class DashBoardModule { }
