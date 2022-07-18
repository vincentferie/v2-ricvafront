import { Superviseur } from './../../../administration/operations/superviseur/superviseur.types';
import { Specificite } from './../../../administration/operations/specificite/specificite.types';
import { Campagne } from "../../../administration/operations/campagne/campagne.types";
import { Entrepot } from "../../../administration/operations/entrepot/entrepot.types";
import { Exportateur } from "../../../administration/operations/exportateur/exportateur.types";
import { Speculation } from "../../../administration/operations/speculation/speculation.types";
import { Ville } from "../../../administration/operations/ville/ville.types";

export enum StateChargement {
  valider = 1,
  rejeter = 0,
  refraction = 2,
}

export interface Dechargement {
  id: string;
  campagne_id?: string;
  campagne?: Campagne;
  superviseur_id?: string;
  superviseur?: Superviseur;
  provenance_id?: string;
  provenance?: Ville;
  specificity_id?: string;
  specificite?: Specificite;
  exportateur_id?: string;
  exportateur?: Exportateur;
  entrepot_id?: string;
  entrepot?: Entrepot;
  speculation_id?: string;
  speculation?: Speculation;
  num_fiche?: string;
  date_dechargement?: string;
  tracteur?: string;
  remorque?: string;
  fournisseur?: string;
  contact_fournisseur?: string;
  transporteur?: string;
  statut?: number;
  validity?: boolean;
  fiche?: any;
  file?: any;
}
