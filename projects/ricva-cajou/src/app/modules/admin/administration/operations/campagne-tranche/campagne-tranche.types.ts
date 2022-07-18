import { Campagne } from "../campagne/campagne.types";

export interface CampagneTranche {
  id?: string;
  libelle?: string;
  outturn_min?: number;
  outturn_max?: number;
  prix?: number;
  date_debut?: string;
  date_fin?: string;
  campagne_id?: string;
  campagne?: Campagne;
}
