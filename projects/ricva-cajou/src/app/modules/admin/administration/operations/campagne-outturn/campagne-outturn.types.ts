import { Campagne } from "../campagne/campagne.types";

export interface CampagneOutturn {
  id?: string;
  flag?: string;
  min_outturn?: number;
  max_outturn?: number;
  campagne_id?: string;
  campagne?: Campagne;
}
