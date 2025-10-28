export interface Concert {
  id: number;
  title: string;
  description: string;
  place: string;
  unitPrice: number;
  genre: string;
  genreId: number;
  dateEvent: string;
  timeEvent: string;
  imageURl: string;
  ticketsQuantity: number;
  finalized: boolean;
  status: string;
}
export interface GetConcertByIdResponse {
  data: Concert;
  success: boolean;
  errorMessage: string;
}
export interface BuyTicketsResponse {
  data: number;
  success: boolean;
  errorMessage: string;
}