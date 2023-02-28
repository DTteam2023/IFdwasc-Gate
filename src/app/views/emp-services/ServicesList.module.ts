import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { ServicesListRoutes } from './ServicesList.routing';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OhdaComponent } from './ohda/ohda.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatGridListModule,
    FlexLayoutModule,
    NgChartsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    NgApexchartsModule,
    SharedPipesModule,
    RouterModule.forChild(ServicesListRoutes)
  ],
  declarations: [

    HealthcareComponent,
      OhdaComponent
  ],
  exports: []
})
export class ServicesListModule {

}