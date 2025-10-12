import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { tokenExpiredInterceptor } from './app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenExpiredInterceptor])),
    // provideAnimations(), 
    importProvidersFrom(SimpleNotificationsModule.forRoot()),
  ]
};


