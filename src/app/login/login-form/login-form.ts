import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  authService = inject(AuthService);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  router = inject(Router);
  notifications = inject(NotificationsService);
  login() {
    const email = this.loginForm.controls.email.value!;
    const password = this.loginForm.controls.password.value!;

    // this.authService
    //   .login(email, password)
    //   .pipe(
    //     catchError((err: HttpErrorResponse) => {
    //       console.log('error: ', err);
    //     })
    //   )
    //   .subscribe((res) => {
    //     localStorage.setItem('token', res.data.token);
    //     localStorage.setItem('tokenExpiration', res.data.expirationDate);
    //     this.authService.decodeToken();
    //     alert('Login exitoso, bienvenido.');
    //     this.router.navigateByUrl('/');
    //   });
    this.authService.login(email, password).subscribe({
      next: (res) => {
        if (res.success) {
           localStorage.setItem('token', res.data.token);
           localStorage.setItem('tokenExpiration', res.data.expirationDate);
           this.authService.decodeToken();
          this.notifications.success('Login sucessfull', 'Loged in');
          this.router.navigateByUrl('/');
        } else {
          this.notifications.error('Error', res.errorMessage);
          console.log(res.errorMessage);
        }
      },
      error: (err) => {
        const displayMessage = 'Error at login ' + err.error.errorMessage;
        this.notifications.error('Error de Conexión/Servidor', displayMessage);
        console.error('HTTP Error during login:', err);
      },
    });
  }
}
