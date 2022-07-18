import { Route } from '@angular/router';
import { EntrepotSelectResolver, } from '../entrepot/entrepot.resolvers';
import { SuperviseurSelectResolver } from '../superviseur/superviseur.resolvers';
import { CreationEntrepotAssigneComponent } from './creation/creation-entrepot-assigne.component';
import { DetailEntrepotAssigneComponent } from './detail/detail-entrepot-assigne.component';
import { EntrepotAssigneComponent } from './entrepot-assigne.component';
import { EntrepotAssignesResolver } from './entrepot-assigne.resolvers';
import { ListEntrepotAssigneComponent } from './list/list-entrepot-assigne.component';

export const entrepotAssigneRoutes: Route[] = [
  {
    path: '',
    component: EntrepotAssigneComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListEntrepotAssigneComponent,
        resolve: {
          entrepotAssignes: EntrepotAssignesResolver
        }
      },
      {
        path: 'new',
        component: CreationEntrepotAssigneComponent,
        resolve: {
          entrepots: EntrepotSelectResolver,
          superviseurs: SuperviseurSelectResolver,
        }
      },
      {
        path: 'detail', component: DetailEntrepotAssigneComponent,
        resolve: {
          entrepots: EntrepotSelectResolver,
          superviseurs: SuperviseurSelectResolver,
        }
      },
    ],
  },
];
