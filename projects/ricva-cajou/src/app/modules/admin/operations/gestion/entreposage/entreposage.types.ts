import { Ville } from '@ricva-cajou/src/app/modules/admin/administration/operations/ville/ville.types';
import { Exportateur } from '@ricva-cajou/src/app/modules/admin/administration/operations/exportateur/exportateur.types';
import { Campagne } from "../../../administration/operations/campagne/campagne.types";
import { Entrepot } from "../../../administration/operations/entrepot/entrepot.types";
import { Site } from "../../../administration/operations/site/site.types";
import { Specificite } from "../../../administration/operations/specificite/specificite.types";
import { Speculation } from "../../../administration/operations/speculation/speculation.types";
import { Dechargement } from "../dechargements/dechargement.types";

export enum StateLots {
  nantis = 1,
  relacher = 2,
  denantis = 3,
}

export interface Analyse {
  id?: string,
  lot_id?: string,
  out_turn?: any,
  grainage?: number,
  th?: any,
}

export interface Transfert {
  id?: string,
  lot_id?: string,
  site_provenance_id?: string,
  provenance?: Ville,
  site_destination_id: string,
  destination?: Ville,
  statut_tirage?: string,
  poids_net_mq?: number,
  sac_mq?: number,
  poids_net_dechet?: number,
  sac_dechet?: number,
  poids_net_poussiere?: number,
  total_sac_trie?: number,
  sac_poussiere?: number,
}

export interface Cession {
  id?: string,
  lot_id?: any,
  recevant_id?: any,
  recevant?: Exportateur,
  cedant_id: any,
  cedant: Exportateur,
  date_session?: string,
}

export interface Balance {
  id?: string,
  lot_id?: any,
  entrepot_id?: any,
  entrepot?: Entrepot,
  campagne_id?: any,
  campagne?: Campagne,
  nbre_sacs?: number,
  date?: string,
}

export interface Balayure {
  id?: string,
  lot_id?: any,
  entrepot_id?: any,
  entrepot?: Entrepot,
  campagne_id?: any,
  campagne?: Campagne,
  nbre_sacs?: number,
  date?: string,
}

export interface Entreposage {
  id?: string,
  campagne_id?: string,
  campagne?: Campagne,
  site_id?: string,
  site?: Site,
  provenance?: Ville,
  entrepot_id?: string,
  entrepot?: Entrepot,
  exportateur_id?: string,
  exportateur?: Exportateur,
  speculation_id?: string,
  speculation?: Speculation,
  dechargement_id?: string,
  dechargement?: Dechargement,
  specificity_id?: string,
  specificity?: Specificite,
  code_dechargement?: string,
  numero_ticket_pese?: string,
  numero_lot?: string,
  sac_en_stock?: number,
  premiere_pesee?: number,
  deuxieme_pesee?: number,
  reconditionne?: number,
  tare_emballage_refraction?: number,
  poids_net?: number,
  sacs_decharge?: number,
  date_dechargement?: string,
  statut?: any,
  validity?: boolean,
  file?: any,
  analyses?: Analyse,
  balayures?: Balayure[],
  transferts?: Transfert[],
  cession?: Cession,
  sweep?: Balayure[],
  balances?: Balance[],
}
