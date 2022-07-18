import { CampagneRequired } from './../required/required.types';

export interface Campagne {
  id?: string;
  libelle?: string;
  ouverture?: string;
  fermeture?: string;
  campagne_id?: string;
  masterCampagne?: CampagneRequired;
}
