import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { EventDetail } from './event-detail/event-detail';
import { Customer } from './customer/customer';
import { MyPurchases } from './customer/my-purchases/my-purchases';
import { ChangePassword } from './customer/change-password/change-password';

export const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    pathMatch: 'full',
    loadComponent: () => import('./register/register').then((m) => m.Register),
  },
  {
    path: 'forgot-password',
    pathMatch: 'full',
    loadComponent: () => import('./forgot-password/forgot-password').then((m) => m.ForgotPassword),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'event-detail/:id',
    pathMatch: 'full',
    component: EventDetail,
  },
  {
    path: 'customer',
    pathMatch: 'prefix',
    component: Customer,
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'my-purchases',
        },
        {
            path: 'my-purchases',
            component: MyPurchases,
        },
        {
            path: 'change-password',
            component: ChangePassword,
        },
    ]
  }
];
