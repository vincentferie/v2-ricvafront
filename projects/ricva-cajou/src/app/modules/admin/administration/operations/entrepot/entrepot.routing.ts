import { Route } from '@angular/router';
import { EntrepotsResolver } from '../../../administration/operations/entrepot/entrepot.resolvers';
import { SiteSelectResolver } from '../site/site.resolvers';
import { CreationEntrepotComponent } from './creation/creation-entrepot.component';
import { DetailEntrepotComponent } from './detail/detail-entrepot.component';
import { EntrepotComponent } from './entrepot.component';
import { ListEntrepotComponent } from './list/list-entrepot.component';

export const entrepotRoutes: Route[] = [
  {
    path: '',
    component: EntrepotComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListEntrepotComponent,
        resolve: {
          entrepots: EntrepotsResolver
        }
      },
      {
        path: 'new',
        component: CreationEntrepotComponent,
        resolve: {
          sites: SiteSelectResolver,
        }
      },
      {
        path: 'detail', component: DetailEntrepotComponent,
        resolve: {
          sites: SiteSelectResolver,
        }
      },
    ],
  },
];
