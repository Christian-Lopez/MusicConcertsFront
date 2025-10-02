import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Options, SimpleNotificationsModule } from 'angular2-notifications';
import { AuthService } from './shared/services/auth-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SimpleNotificationsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Music-Concerts');

  authService = inject(AuthService);

   notificationsOptions: Options = {
    position: ['top', 'right'],
    timeOut: 3000,
  };

  constructor() {
    this.authService.decodeToken();
  }
}
