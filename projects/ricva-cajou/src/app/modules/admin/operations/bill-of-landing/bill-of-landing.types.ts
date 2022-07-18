import { Conteneur } from './../exports/parking-list/conteneurs/conteneur.types';
import { Campagne } from "../../administration/operations/campagne/campagne.types";

export interface Detail {
  id: string;
  bill_lading_id?: string;
  conteneur_id?: string;
  conteneur?: Conteneur;
  nbr_sacs?: number;
  gross_weight?: number;
  tare?: number;
  measurement?: number;
}

export interface BillOfLanding {
  id: string;
  campagne_id?: any;
  campagne?: Campagne;
  numero_voyage?: string;
  numero_bl?: string;
  destination?: string;
  provenance?: string;
  amateur?: string;
  nom_client?: string;
  adresse_client?: string;
  pays_client?: string;
  port_depart?: string;
  port_arrive?: string;
  date_embarquement?: string;
  details?: Detail[];
  detailBls?: Detail[];
  file?: any;
}
