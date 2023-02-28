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
import { HirarchyRoutes } from './hierarchy.routing';
import { ITComponent } from './hierarchy.component';

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
    RouterModule.forChild(HirarchyRoutes)
  ],
  declarations: [ITComponent]
})
export class HierarchyModule { }
