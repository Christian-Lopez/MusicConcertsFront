import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BuyTicketsResponse, GetConcertByIdResponse, GetSaleByIdResponse, GetPurchasesResponse } from '../models/concert-model';
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
  buyTickets(eventId: string, quantity: number) {
    return this.http.post<BuyTicketsResponse>(this.baseUrl + 'sales', {
      concertId: eventId,
      ticketsQuantity: quantity,
    });
  }

  getSaleById(saleId: number) {
    return this.http.get<GetSaleByIdResponse>(this.baseUrl + 'sales/?id=' + saleId);
  }

  getMySales(email: string) {
    return this.http.get<GetPurchasesResponse>(this.baseUrl + 'sales/Filter?email=' + email);
  }
}
