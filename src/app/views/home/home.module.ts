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

import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { SharedModule } from 'app/shared/shared.module';
import { SharedComponentsModule } from 'app/shared/components/shared-components.module';

@NgModule({
    declarations: [HomeComponent],
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
        RouterModule.forChild(HomeRoutes),
        SharedComponentsModule
    ]
})
export class HomeModule { }
