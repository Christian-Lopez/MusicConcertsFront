import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Config } from '../../shared/services/config';
import { ListSalesByDateApiResponse } from './sales.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  config = inject(Config);
  http = inject(HttpClient);

  private baseUrl = this.config.getBaseUrl();

  listSalesByDate(dateFrom: Date, dateTo: Date) {
    const dateFromStr = dateFrom.toISOString().split('T')[0];
    const dateToStr = dateTo.toISOString().split('T')[0];
    return this.http.get<ListSalesByDateApiResponse>(
      `${this.baseUrl}sales/ListByDate?dateFrom=${dateFromStr}&dateTo=${dateToStr}`
    );
  }
}
