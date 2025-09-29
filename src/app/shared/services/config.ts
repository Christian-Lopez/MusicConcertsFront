import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
  private baseUrl = 'https://concertsapi.azurewebsites.net/api/';
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
