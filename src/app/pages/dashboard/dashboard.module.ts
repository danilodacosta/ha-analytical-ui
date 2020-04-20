import { DashboardComponent } from './dashboard/dashboard.component';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import {MultiSelectModule} from 'primeng/multiselect';
import {TabViewModule} from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    FormsModule,
    SharedModule,
    DashBoardRoutingModule,
    MultiSelectModule,
    TabViewModule,
    ChartModule,
    CardModule


  ]
})
export class DashBoardModule { }
