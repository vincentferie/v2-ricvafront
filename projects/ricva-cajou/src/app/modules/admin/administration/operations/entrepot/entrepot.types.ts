import { Site } from "../site/site.types";

export interface Entrepot {
  id?: string;
  coordonneex?: number;
  coordonneey?: number;
  libelle?: string;
  mode?: number;
  site_id?: string;
  site?: Site;
  superficie?: number;
}
