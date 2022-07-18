import { CampagneNoClosedResolver, CampagnesResolver } from './../../administration/operations/campagne/campagne.resolvers';
import { Route } from '@angular/router';
import { ConteneurNoBillLandingResolver } from '../exports/parking-list/conteneurs/conteneur.resolvers';
import { BillOfLandingsResolver } from './bill-of-landing.resolvers';
import { BillOfLandingsComponent } from './bill-of-landings.component';
import { CreationBillOfLandingComponent } from './creation/creation-bill-of-landing.component';
import { DetailBillOfLandingComponent } from './detail/detail-bill-of-landing.component';
import { ListBillOfLandingComponent } from './list/list-bill-of-landing.component';
import { VillesResolver } from '../../administration/operations/ville/ville.resolvers';

export const billOfLandingRoutes: Route[] = [
  {
    path: '',
    component: BillOfLandingsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListBillOfLandingComponent,
        resolve: {
          billOfLandings: BillOfLandingsResolver,
        },
      },
      {
        path: 'new',
        component: CreationBillOfLandingComponent,
        resolve: {
          campagnes: CampagneNoClosedResolver,
          conteneurs: ConteneurNoBillLandingResolver,
        },
      },
      {
        path: 'detail', component: DetailBillOfLandingComponent,
        resolve: {
          campagnes: CampagneNoClosedResolver,
        },
      },
    ],
  },
];
