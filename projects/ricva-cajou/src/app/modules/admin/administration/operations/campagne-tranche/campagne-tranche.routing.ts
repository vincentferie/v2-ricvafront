import { Route } from '@angular/router';
import { CampagneTranchesResolver } from '../campagne-tranche/campagne-tranche.resolvers';
import { CampagneNoClosedResolver } from '../campagne/campagne.resolvers';
import { CampagneTrancheComponent } from './campagne-tranche.component';
import { CreationCampagneTrancheComponent } from './creation/creation-campagne-tranche.component';
import { DetailCampagneTrancheComponent } from './detail/detail-campagne-tranche.component';
import { ListCampagneTrancheComponent } from './list/list-campagne-tranche.component';

export const campagneTrancheRoutes: Route[] = [
  {
    path: '',
    component: CampagneTrancheComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListCampagneTrancheComponent,
        resolve: {
          campagnes: CampagneTranchesResolver
        }
      },
      {
        path: 'new',
        component: CreationCampagneTrancheComponent,
        resolve: {
          campagnes: CampagneNoClosedResolver
        }
      },
      {
        path: 'detail', component: DetailCampagneTrancheComponent,
        resolve: {
          campagnes: CampagneNoClosedResolver
        }
      },
    ],
  },
];
