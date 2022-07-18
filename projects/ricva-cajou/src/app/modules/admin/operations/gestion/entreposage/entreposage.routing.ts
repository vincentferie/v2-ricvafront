import { EntreposageComponent } from './entreposage.component';
import { Route } from '@angular/router';
import { CreationEntreposageComponent } from './creation/creation-entreposage.component';
import { DetailEntreposageComponent } from './detail/detail-entreposage.component';
import { ListEntreposageComponent } from './list/list-entreposage.component';
import { CampagneNoClosedResolver, CampagneSelectResolver } from '../../../administration/operations/campagne/campagne.resolvers';
import { StateLotsResolver } from '../../../administration/operations/required/required.resolvers';
import { VillesResolver } from '../../../administration/operations/ville/ville.resolvers';
import { EntrepotAssigneSelectResolver } from '../../../administration/operations/entrepot-assigne/entrepot-assigne.resolvers';
import { SiteSelectResolver } from '../../../administration/operations/site/site.resolvers';

export const entreposageRoutes: Route[] = [
  {
    path: '',
    component: EntreposageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListEntreposageComponent,
        resolve: {
          campagnes: CampagneSelectResolver,
          statut: StateLotsResolver,
        },
      },
      {
        path: 'new',
        component: CreationEntreposageComponent,
        resolve: {
          campagnes: CampagneNoClosedResolver,
        },
      },
      {
        path: 'detail', component: DetailEntreposageComponent,
        resolve: {
          sites: SiteSelectResolver,
          campagnes: CampagneNoClosedResolver,
          entrepots: EntrepotAssigneSelectResolver,
          provenances: VillesResolver,
        },
      },
    ],
  },
];
