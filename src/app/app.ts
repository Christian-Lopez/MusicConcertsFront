import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './shared/services/auth-service';


import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Music-Concerts');

  authService = inject(AuthService);

  constructor() {
    this.authService.decodeToken();
  }
}
