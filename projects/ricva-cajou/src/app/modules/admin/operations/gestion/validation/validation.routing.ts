import { ValidationComponent } from './validation.component';
import { Route } from '@angular/router';
import { DetailValidationComponent } from './detail/detail-validation.component';
import { ListValidationComponent } from './list/list-validation.component';
import { CampagneSelectResolver } from '../../../administration/operations/campagne/campagne.resolvers';

export const validationRoutes: Route[] = [
  {
    path: '',
    component: ValidationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListValidationComponent,
        resolve: {
          campagnes: CampagneSelectResolver
        },
      },
      {
        path: 'detail',
        component: DetailValidationComponent
      }
    ],
  },
];
