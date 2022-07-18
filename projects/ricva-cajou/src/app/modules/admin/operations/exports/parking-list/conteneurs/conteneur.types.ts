import { Entrepot } from "../../../../administration/operations/entrepot/entrepot.types";
import { Booking } from "../bookings/booking.types";

export enum StateType {
  vingtPied = '40’',
  quarantePied = '20’',
}

export interface Plomb {
  id: any;
  conteneur_id?: string;
  pb_lettre?: string;
  pb_chiffre?: number;
}

export interface Conteneur {
  id?: any;
  booking_id?: string;
  booking?: Booking;
  entrepot_id?: string;
  entrepot?: Entrepot;
  numero?: any;
  type_tc?: any;
  capacite?: number;
  plomb?: Plomb;
}
