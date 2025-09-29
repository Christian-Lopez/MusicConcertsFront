import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';

export const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: Home,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: Login,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: Register,
  },
  {
    path: 'forgot-password',
    pathMatch: 'full',
    component: ForgotPassword,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
