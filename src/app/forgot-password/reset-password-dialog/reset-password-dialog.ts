import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { NotificationsService } from 'angular2-notifications';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordRequestBody } from '../../shared/models/auth-model';
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reset-password-dialog',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,],
  templateUrl: './reset-password-dialog.html',
  styleUrl: './reset-password-dialog.css',
})
export class ResetPasswordDialog {
  authService = inject(AuthService);
  router = inject(Router);
  data = inject(MAT_DIALOG_DATA) as { email: string };
  dialogRef = inject(DialogRef);
  notifications = inject(NotificationsService);

  resetPassword(form: NgForm) {
    const body: ResetPasswordRequestBody = {
      email: this.data.email,
      token: form.controls['token'].value,
      newPassword: form.controls['password'].value,
      confirmNewPassword: form.controls['confirmPassword'].value,
    };
    // this.authService.resetPassword(body).subscribe(() => {
    //   this.notifications.success('Password updated', 'Login');
    //   this.router.navigateByUrl('/login');
    //   this.dialogRef.close();
    // });
    this.authService.resetPassword(body).subscribe({
      next: (res) => {
          if (res.success) {
            this.notifications.success('Password updated', 'Login');
            this.router.navigateByUrl('/login');
            this.dialogRef.close();
          } else {            
            this.notifications.error('Error', res.errorMessage);
            console.log(res.errorMessage);
          }
        },
        error: (err) => {
          const displayMessage = err.error.errorMessage;          
          this.notifications.error('Server Error', displayMessage);
          console.error('HTTP Error during registration:', err);
        },
    });
  }

  verifyPasswords(form: NgForm) {
    const password = form.controls['password'];
    const confirmPassword = form.controls['confirmPassword'];

    if (
      password &&
      confirmPassword &&
      password.value &&
      confirmPassword.value &&
      password.value === confirmPassword.value
    ) {
      confirmPassword.setErrors(null);
    } else {
      confirmPassword.setErrors({ mismatch: true });
    }
  }
}
