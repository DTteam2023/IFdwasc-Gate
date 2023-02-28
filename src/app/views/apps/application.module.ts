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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppsRoutes } from './application.routing';
import { AccOpenComponent } from './Archive/acc-open/acc-open.component';
import { ConveyanceComponent } from './Archive/conveyance/conveyance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { ConnectCutComponent } from './Archive/connect-cut/connect-cut.component';
import { DataCertificateComponent } from './Archive/data-certificate/data-certificate.component';
import { AccountStateComponent } from './Archive/account-state/account-state.component';
import { CounterStoleComponent } from './Archive/counter-stole/counter-stole.component';
import { AssayDiffComponent } from './Archive/assay-diff/assay-diff.component';
import { CounterCheckComponent } from './Archive/counter-check/counter-check.component';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { ArchiveSearchComponent } from './Archive/client-files/archive-search/archive-search.component';
import { ClientOpenComponent } from './Archive/client-files/client-open/client-open.component';
import { NgxTablePopupComponent } from './Archive/client-files/ngx-table-popup/ngx-table-popup.component';
import { ClientPreviewComponent } from './Archive/client-files/client-preview/client-preview.component';
import { ClientArchiveComponent } from './Archive/client-archive/client-archive.component';
import { PreviewComponent } from './Archive/preview/preview.component';
import { AccConvertComponent } from './Archive/acc-convert/acc-convert.component';
import { SavingComponent } from './Archive/saving/saving.component';
import { ClientSavingComponent } from './Archive/client-files/client-saving/client-saving.component';
import { ClientConveyanceComponent } from './Archive/client-files/client-conveyance/client-conveyance.component';
import { ClientCheckMererComponent } from './Archive/client-files/client-check-merer/client-check-merer.component';
import { ClientAccStateComponent } from './Archive/client-files/client-acc-state/client-acc-state.component';
import { ClientCertificationComponent } from './Archive/client-files/client-certification/client-certification.component';
import { ClientConnectCutoffComponent } from './Archive/client-files/client-connect-cutoff/client-connect-cutoff.component';
import { ClientStoleComponent } from './Archive/client-files/client-stole/client-stole.component';
import { ClientCheckdiffComponent } from './Archive/client-files/client-checkdiff/client-checkdiff.component';


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
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    PerfectScrollbarModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    NgApexchartsModule,
    SharedPipesModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(AppsRoutes)
  ],
  declarations: [
    AccOpenComponent,
    ConveyanceComponent,
    ConnectCutComponent,
    DataCertificateComponent,
    AccountStateComponent,
    CounterStoleComponent,
    AssayDiffComponent,
    CounterCheckComponent,
    ArchiveSearchComponent,
    NgxTablePopupComponent,
    ClientOpenComponent,
    ClientPreviewComponent,
    PreviewComponent,
    ClientArchiveComponent,
    AccConvertComponent,
    SavingComponent,
    ClientSavingComponent,
    ClientConveyanceComponent,
    ClientCheckMererComponent,
    ClientAccStateComponent,
    ClientCertificationComponent,
    ClientConnectCutoffComponent,
    ClientStoleComponent,
    ClientCheckdiffComponent,
  ],
  exports: []
})
export class ApplicationsModule {

}