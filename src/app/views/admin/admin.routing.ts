import { Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/guards/auth.guard';
import { UserRoleGuard } from 'app/shared/guards/user-role.guard';
import { EmpListComponent } from './emp-list/emp-list.component';


export const AdminRoutes: Routes = [

    {
        path: '',
        canActivate: [AuthGuard,UserRoleGuard],
        component: EmpListComponent,
        data: { title: '', breadcrumb: '' ,roles:"Admin"},
    },

];