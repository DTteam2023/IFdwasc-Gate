import { Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { UserRoleGuard } from 'app/shared/guards/user-role.guard';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { OhdaComponent } from './ohda/ohda.component';

export const ServicesListRoutes: Routes = [
    {
        path: 'healthcare',
        component: HealthcareComponent,
        canActivate: [UserRoleGuard],
        data: { title: 'الرعاية الصحية', breadcrumb: 'healthcare',roles:["Arch","Admin","Employee"] }
    },
    {
        path: 'ohda',
        component: OhdaComponent,
        canActivate: [UserRoleGuard],
        data: { title: 'العهدة الشخصية', breadcrumb: 'ohda' ,roles:["Arch","Admin","Employee"]}
    }
];
