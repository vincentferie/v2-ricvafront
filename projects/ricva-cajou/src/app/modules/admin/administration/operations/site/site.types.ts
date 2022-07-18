import { Entrepot } from "../entrepot/entrepot.types";
import { Ville } from "../ville/ville.types";

export interface Site {
  id?: string;
  libelle?: string;
  ville_id?: string;
  ville?: Ville;
  superficie?: number;
  coordonneex?: number;
  coordonneey?: number;
  entrepots?: Entrepot[];
}
