import { Routes } from '@angular/router';
import { ITComponent } from './hierarchy.component';


export const HirarchyRoutes: Routes = [
  { path: '', component: ITComponent },
  {
    path: 'hierarchy/:id',
    component: ITComponent,
  }
];