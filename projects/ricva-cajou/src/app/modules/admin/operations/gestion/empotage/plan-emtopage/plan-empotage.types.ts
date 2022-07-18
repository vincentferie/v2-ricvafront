import { Entrepot } from "../../../../administration/operations/entrepot/entrepot.types";
import { Transitaire } from "../../../../administration/operations/transitaire/transitaire.types";
import { Conteneur } from "../../../exports/parking-list/conteneurs/conteneur.types";
import { Entreposage } from "../../entreposage/entreposage.types";

export interface ConteneurPlan {
  id?: string;
  plan_empotage_id?: string;
  planEmpotage?: PlanEmpotage;
  conteneur_id?: string;
  conteneur?: Conteneur;
}

export interface LotPlan {
  id?: string;
  plan_empotage_id?: string;
  planEmpotage?: PlanEmpotage;
  lot_id?: string;
  lot?: Entreposage;
  nbr_sacs?: number;
}

export interface PlanEmpotage {
  id?: string;
  entrepot_id?: string;
  entrepot?: Entrepot;
  transitaire_id?: string;
  transitaire?: Transitaire;
  conteneurs?: ConteneurPlan[];
  lots?: LotPlan[];
}
