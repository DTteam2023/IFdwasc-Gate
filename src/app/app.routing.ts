import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AppLayoutComponent } from './shared/components/layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { ServiceLayoutComponent } from './shared/components/layouts/Services-layout/Services-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserRoleGuard } from './shared/guards/user-role.guard';

export const rootRouterConfig: Routes = [
  
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
      data: { title: 'البوابة الرقمية لشركة مياه الشرب والصرف الصحي بالفيوم' }
    },
    
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session'}
      }
    ]
  },
  //{
  //  path: '',
  //  component: AdminLayoutComponent,
  //  canActivate: [AuthGuard],
  //  children: [

  //  ]
  //},
  {
    path: '',
    component: ServiceLayoutComponent,
    canActivate: [AuthGuard],
    //,
    children: [
      {
        path: 'servicelist',
        //canActivate: [AuthGuard],
        loadChildren: () => import('./views/emp-services/ServicesList.module').then(m => m.ServicesListModule),
        data: { title: '', breadcrumb: 'ServicesList'}
        
      },
      {
        path: 'hierarchy',
        //canActivate: [AuthGuard],
        loadChildren: () => import('./views/hierarchy/hierarchy.module').then(m => m.HierarchyModule),
        data: { title: 'hierarchy', breadcrumb: 'hierarchy'}
      },
      {
        path: 'others',
        loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
        data: { title: 'Others', breadcrumb: 'OTHERS'}
      },
      {
        path: 'search',
        loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
      },
      {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule)
      },
    ]
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./views/apps/application.module').then(m => m.ApplicationsModule),
        data: { title: '', breadcrumb: 'application'}
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

