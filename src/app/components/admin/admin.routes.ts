import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((mod) => mod.DashboardComponent),
        title: 'Dashboard',
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./user/user.component').then((mod) => mod.UserComponent),
        title: 'User List',
        data: { breadcrumb: 'Usuarios' },
      },
      {
        path: 'me',
        loadComponent: () =>
          import('./me/me.component').then((mod) => mod.MeComponent),
        title: 'User Me',
        data: { breadcrumb: 'Mi perfil' },
      },
    ],
  },
];