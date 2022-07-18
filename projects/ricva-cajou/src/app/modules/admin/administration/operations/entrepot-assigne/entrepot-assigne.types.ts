import { Entrepot } from "../entrepot/entrepot.types";
import { Superviseur } from "../superviseur/superviseur.types";

export interface EntrepotAssigne {
  id?: string;
  superviseur_id?: string;
  superviseur?: Superviseur;
  entrepot_id?: string;
  entrepot?: Entrepot;
  actif?: boolean;
}
