import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../../shared/services/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordDialog } from '../reset-password-dialog/reset-password-dialog';

@Component({
  selector: 'app-forgot-password-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './forgot-password-form.html',
  styleUrl: './forgot-password-form.css',
})
export class ForgotPasswordForm {
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  notifications = inject(NotificationsService);
  sendToken(email: string) {
    this.authService
      .sendTokenToResetPassword(email)
      // .pipe(
      //   catchError((err) => {
      //     console.log('error api');
      //     return err.error.errorMessage;
      //   })
      // )
      .subscribe({
        // this.notifications.info('Token Enviado. Revisa tu correo.');
        // this.matDialog.open(ResetPasswordDialog, {
        //   disableClose: true,
        //   data: { email },
        // });
        next: (res) => {
          if (res.success) {
            this.notifications.success('Token Sent', 'Check your email.');
            this.matDialog.open(ResetPasswordDialog, {
              disableClose: true,
              data: { email },
            });
          } else {
            // ⚠️ This ELSE handles server responses that are 200 OK but contain a business error flag (res.success: false)
            this.notifications.error('Error', res.errorMessage);
            console.log(res.errorMessage);
          }
        },
        error: (err) => {
          // This is where most Bad Request (400) errors land
          // We assume the service's catchError already processed the HTTP error into a user-friendly message
          const displayMessage = err.error.errorMessage;
          // const displayMessage = err.message || 'Ocurrió un error desconocido durante el registro.';
          this.notifications.error('Error de Conexión/Servidor', displayMessage);
          console.error('HTTP Error during registration:', err);
        },
      });
  }
}
