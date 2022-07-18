export enum StateBooking {
  encours = 0,
  terminer = 1,
}

export interface Booking {
  id?: string;
  numero_reel?: string;
  numero_change?: string;
  state?: any;
  file?: any;
}
