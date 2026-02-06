import { Sale } from '../../shared/models/concert-model';

export interface SalesTableDataModel {
  client: string;
  event: string;
  tickets: number;
  total: number;
  eventDate: string;
  saleDate: string;
  genre: string;
}

export interface ListSalesByDateApiResponse {
  data: Sale[];
  success: boolean;
  errorMessage: string;
}
