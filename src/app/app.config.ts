import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'; 
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar'; 
import { jwtInterceptor, tokenExpiredInterceptor, loadingScreenInterceptor } from './app.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenExpiredInterceptor,jwtInterceptor, loadingScreenInterceptor])),
    // provideAnimations(), 
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule),
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { verticalPosition: 'top', horizontalPosition: 'center' } }
  ]
};


