import { Site } from "../site/site.types";
import { Superviseur } from "../superviseur/superviseur.types";

export interface SiteAssigne {
  id?: string;
  superviseur_id?: string;
  superviseur?: Superviseur;
  site_id?: string;
  site?: Site;
  actif?: boolean;
}
