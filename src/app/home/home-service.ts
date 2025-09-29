import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Home } from './home';
import { HomeApiResponse } from './home-model';
import { Config } from '../shared/services/config';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  
  config = inject(Config);
  http = inject(HttpClient);

  getHome(): Observable<HomeApiResponse> {
    return this.http.get<HomeApiResponse>(this.config.getBaseUrl() + 'home').pipe(
      catchError((err: any) => {
        console.error('Error occurred while fetching home data:', err);
        throw err;
      })
    );
  }
}
