import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetConcertByIdResponse } from '../models/concert-model';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ConcertService {
  config = inject(Config);
  
   private baseUrl = this.config.getBaseUrl();
  private http = inject(HttpClient);

  getConcertById(id: string) {
    return this.http.get<GetConcertByIdResponse>(
      this.baseUrl + 'concerts/Concert/' + id
    );
  }
}
