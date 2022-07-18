import { Route } from '@angular/router';
import { CampagnesResolver } from '../../../administration/operations/campagne/campagne.resolvers';
import { CampagneRequiredResolver } from '../required/required.resolvers';
import { CampagneComponent } from './campagne.component';
import { CreationCampagneComponent } from './creation/creation-campagne.component';
import { DetailCampagneComponent } from './detail/detail-campagne.component';
import { ListCampagneComponent } from './list/list-campagne.component';

export const campagneRoutes: Route[] = [
  {
    path: '',
    component: CampagneComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListCampagneComponent,
        resolve: {
          campagnes: CampagnesResolver
        }
      },
      {
        path: 'new',
        component: CreationCampagneComponent,
        resolve: {
          campagnes: CampagneRequiredResolver
        }
      },
      {
        path: 'detail', component: DetailCampagneComponent,
        resolve: {
          campagnes: CampagneRequiredResolver
        }
      },
    ],
  },
];
