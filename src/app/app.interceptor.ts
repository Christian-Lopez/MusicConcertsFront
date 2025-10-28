
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/auth-service';
import { EMPTY } from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

export const tokenExpiredInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (authService.getIsLoggedIn()) {
    const currentDate = new Date();
    if (currentDate > authService.getTokenExpiration()) {
      authService.logout(true);
      return EMPTY;
    }
  }

  return next(req);
};

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;

  const token = localStorage.getItem('token');
  if (token) {
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }

  return next(clonedRequest);
};