import { Entreposage } from './../../entreposage/entreposage.types';
import { Conteneur } from "../../../exports/parking-list/conteneurs/conteneur.types";
import { PlanEmpotage } from "../plan-emtopage/plan-empotage.types";

export interface Detail {
  id?: string;
  lot_id?: string;
  lot?: Entreposage;
  nbr_sacs?: number;
}

export interface Execution {
  id?: string;
  plan_empotage_id?: string;
  planEmpotage?: PlanEmpotage;
  conteneur_id?: string;
  conteneur?: Conteneur;
  details?: Detail[];
  nbr_lot?: number;
  nbr_conteneur?: number;
}
