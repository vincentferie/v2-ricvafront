import { Route } from '@angular/router';
import { CampagneNoClosedResolver } from '../campagne/campagne.resolvers';
import { CampagneOutturnComponent } from './campagne-outturn.component';
import { CampagneOutturnsResolver } from './campagne-outturn.resolvers';
import { CreationCampagneOutturnComponent } from './creation/creation-campagne-outturn.component';
import { DetailCampagneOutturnComponent } from './detail/detail-campagne-outturn.component';
import { ListCampagneOutturnComponent } from './list/list-campagne-outturn.component';

export const campagneOutturnRoutes: Route[] = [
  {
    path: '',
    component: CampagneOutturnComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListCampagneOutturnComponent,
        resolve: {
          campagnes: CampagneOutturnsResolver
        }
      },
      {
        path: 'new',
        component: CreationCampagneOutturnComponent,
        resolve: {
          campagnes: CampagneNoClosedResolver
        }
      },
      {
        path: 'detail', component: DetailCampagneOutturnComponent,
        resolve: {
          campagnes: CampagneNoClosedResolver
        }
      },
    ],
  },
];
