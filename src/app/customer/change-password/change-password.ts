import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, MatButtonModule, CommonModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);

  form: FormGroup = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmNewPassword: ['', Validators.required],
  }, { validators: this.passwordsMatchValidator });

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmNewPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  changePassword() {
    if (this.form.invalid) return;

    const request = {
      email: this.authService.getEmail(),
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword
    };

    this.authService.changePassword(request).subscribe((res) => {
      if (res && res.success) {
        this.snackBar.open('Password changed successfully', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
        this.form.reset();
      } else {
         this.snackBar.open(res.errorMessage || 'Error changing password', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }
}


