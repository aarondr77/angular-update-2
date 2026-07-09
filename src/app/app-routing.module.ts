import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'orders/:id',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./order-detail/order-detail.module').then((m) => m.OrderDetailModule),
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./notifications/notifications.module').then((m) => m.NotificationsModule),
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
