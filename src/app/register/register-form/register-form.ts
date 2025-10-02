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
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service';
import { NotificationsService } from 'angular2-notifications';
import { RegisterRequestBody } from '../../shared/models/auth-model';

import { matchPasswordValidator } from '../../shared/validators/match-password';

@Component({
  selector: 'app-register-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      documentType: new FormControl('', [Validators.required]),
      documentNumber: new FormControl('', [Validators.required]),
    },
    { validators: matchPasswordValidator  }
  );
  notifications = inject(NotificationsService);

  register() {
    const body: RegisterRequestBody = {
      age: this.registerForm.controls.age.value!,
      password: this.registerForm.controls.password.value!,
      confirmPassword: this.registerForm.controls.password.value!,
      documentType: this.registerForm.controls.documentType.value!,
      documentNumber: this.registerForm.controls.documentNumber.value!,
      email: this.registerForm.controls.email.value!,
      firstName: this.registerForm.controls.name.value!,
      lastName: this.registerForm.controls.lastName.value!,
    };
    this.authService.register(body).subscribe({
      // 'next' callback: Runs ONLY if the server returns HTTP 200/201
      next: (res) => {
        if (res.success) {
          this.notifications.success('Registro Exitoso', 'Inicia sesión');
          this.router.navigateByUrl('/login');
        } else {
          // ⚠️ This ELSE handles server responses that are 200 OK but contain a business error flag (res.success: false)
          this.notifications.error('Error', res.errorMessage);
          console.log(res.errorMessage);
        }
      },
      // 'error' callback: Runs if the Observable chain THROWS an error (e.g., HTTP 4xx or 5xx)
      error: (err) => {
        // This is where most Bad Request (400) errors land
        // We assume the service's catchError already processed the HTTP error into a user-friendly message
        const displayMessage2 = 'Error at registir ' + err.error.errorMessage;
        // const displayMessage = err.message || 'Ocurrió un error desconocido durante el registro.';
        this.notifications.error('Error de Conexión/Servidor', displayMessage2);
        console.error('HTTP Error during registration:', err);
      },
    });
  }
}
