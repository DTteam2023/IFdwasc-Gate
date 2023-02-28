import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'app/shared/components/perfect-scrollbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AdminRoutes } from './admin.routing';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpUpdateComponent } from './emp-update/emp-update.component';
import { MatTableModule } from '@angular/material/table';
import { NgxTablePopupEmpComponent } from './ngx-table-popup-emp/ngx-table-popup-emp.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    RouterModule.forChild(AdminRoutes)
  ],
  declarations: [EmpListComponent,EmpUpdateComponent, NgxTablePopupEmpComponent]
})
export class AdminModule { }
