import { Speculation } from "../speculation/speculation.types";

export interface CampagneRequired {
  id: string;
  libelle?: string;
  mode?: number
  ouverture?: string;
  fermeture?: string;
  prix_bord?: number;
  speculation_id?: string;
  speculation?: Speculation;
  detailsCampagne?: any[];
}
