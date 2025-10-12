import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Config {
  // private baseUrl = 'https://concertsapi.azurewebsites.net/api/';
  private baseUrl = environment.baseUrl
  getBaseUrl(): string {
    return this.baseUrl;
  }

  
}
