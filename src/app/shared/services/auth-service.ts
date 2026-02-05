import { inject, Injectable, signal } from '@angular/core';
import { Config } from './config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginApiResponse, RegisterRequestBody, ResetPasswordRequestBody } from '../models/auth-model';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

const CLAIMS = {
    ROLE: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
    EMAIL: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    NAME: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  config = inject(Config);

  private tokenExpiration = signal(new Date());

  private role = signal('');
  private email = signal('');
  private name = signal('');

  private isLoggedIn = signal(false);

  private router = inject(Router);
  notifications = inject(MatSnackBar);

  getEmail() {
    return this.email();
  }

  getName() {
    return this.name();
  }

  getRole() {
    return this.role();
  }

  getTokenExpiration() {
    return this.tokenExpiration();
  }

  getIsLoggedIn() {
    return this.isLoggedIn();
  }

  login(email: string, password: string) {
    return this.http.post<LoginApiResponse>(this.config.getBaseUrl() + 'users/login', {
      username: email,
      password : password,
    });
  }

   register(body: RegisterRequestBody):Observable<LoginApiResponse> {
    return this.http.post<LoginApiResponse>(this.config.getBaseUrl() + 'users/register', body);
  }

  sendTokenToResetPassword(email: string):Observable<any> {
    return this.http.post(this.config.getBaseUrl() + 'users/RequestTokenToResetPassword', {
      email,
    });
  }

  resetPassword(body: ResetPasswordRequestBody):Observable<any> {
    return this.http.post(this.config.getBaseUrl() + 'users/ResetPassword', body);
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !tokenExpiration) return;

    this.tokenExpiration.set(new Date(tokenExpiration));

    const jwtDecoded = jwtDecode<any>(token);

    this.role.set(jwtDecoded[CLAIMS.ROLE]);
    this.email.set(jwtDecoded[CLAIMS.EMAIL]);
    this.name.set(jwtDecoded[CLAIMS.NAME]);

    this.isLoggedIn.set(true);
  }

  logout(tokenExpired = false) {
    localStorage.clear();
    this.name.set('');
    this.email.set('');
    this.role.set('');
    this.tokenExpiration.set(new Date());
    this.isLoggedIn.set(false);

    if (tokenExpired) {
      this.notifications.open('Token Expired. Please login', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      this.router.navigateByUrl('/login');
    } else {
      this.notifications.open('Logout', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
      this.router.navigateByUrl('/');
    }
  }
}
