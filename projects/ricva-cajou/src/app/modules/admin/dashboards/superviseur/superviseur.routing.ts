import { Route } from '@angular/router';
import { SuperviseurComponent } from './superviseur.component';
import { SuperviseurResolver } from './superviseur.resolvers';

export const superviseurRoutes: Route[] = [
  {
    path: '',
    component: SuperviseurComponent,
    resolve: {
      data: SuperviseurResolver,
    },
  },
];
