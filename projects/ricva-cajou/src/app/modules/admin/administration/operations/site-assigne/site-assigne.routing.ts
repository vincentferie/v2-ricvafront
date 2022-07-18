import { Route } from '@angular/router';
import { DetailSiteAssigneComponent } from './detail/detail-site-assigne.component';
import { SiteAssignesResolver } from './site-assigne.resolvers';
import { ListSiteAssigneComponent } from './list/list-site-assigne.component';
import { SiteAssigneComponent } from './site-assigne.component';
import { CreationSiteAssigneComponent } from './creation/creation-site-assigne.component';
import { SuperviseurSelectResolver } from '../superviseur/superviseur.resolvers';
import { SiteSelectResolver } from '../site/site.resolvers';

export const siteAssigneRoutes: Route[] = [
  {
    path: '',
    component: SiteAssigneComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListSiteAssigneComponent,
        resolve: {
          siteAssignes: SiteAssignesResolver
        }
      },
      {
        path: 'new',
        component: CreationSiteAssigneComponent,
        resolve: {
          sites: SiteSelectResolver,
          superviseurs: SuperviseurSelectResolver,
        }
      },
      {
        path: 'detail', component: DetailSiteAssigneComponent,
        resolve: {
          sites: SiteSelectResolver,
          superviseurs: SuperviseurSelectResolver,
        }
      },
    ],
  },
];
