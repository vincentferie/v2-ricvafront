import { Superviseur } from '../../../administration/operations/superviseur/superviseur.types';
import { Dechargement } from '../dechargements/dechargement.types';
import { Analyse, Entreposage } from './../entreposage/entreposage.types';

export interface Validation {
  id?: string;
  dechargement_id?: string;
  dechargement?: Dechargement;
  lot_id?: string;
  lot?: Entreposage;
  numero_ticket_pese?: string,
  code_dechargement?: string,
  numero_lot?: string,
  sac_en_stock?: number,
  premiere_pesee?: number,
  deuxieme_pesee?: number,
  reconditionne?: number,
  tare_emballage_refraction?: number,
  sacs_decharge?: number,
  poids_net?: number,
  date_dechargement?: string,
  statut?: number,
  validity?: false,
  file?: any,
  superviseur?: Superviseur,
  analyses?: Analyse,
  signaler?: any[],
}
