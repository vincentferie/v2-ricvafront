import { Route } from '@angular/router';
import { SitesResolver } from '../../../administration/operations/site/site.resolvers';
import { VillesResolver } from '../ville/ville.resolvers';
import { CreationSiteComponent } from './creation/creation-site.component';
import { DetailSiteComponent } from './detail/detail-site.component';
import { ListSiteComponent } from './list/list-site.component';
import { SiteComponent } from './site.component';

export const siteRoutes: Route[] = [
  {
    path: '',
    component: SiteComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListSiteComponent,
        resolve: {
          sites: SitesResolver
        }
      },
      {
        path: 'new',
        component: CreationSiteComponent,
        resolve: {
          villes: VillesResolver
        }
      },
      {
        path: 'detail', component: DetailSiteComponent,
        resolve: {
          villes: VillesResolver
        }
      },
    ],
  },
];
