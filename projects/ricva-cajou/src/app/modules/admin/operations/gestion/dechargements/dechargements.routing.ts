import { Route } from '@angular/router';
import { CreationComponent } from './creation/creation.component';
import { DechargementsComponent } from './dechargements.component';
import { DetailComponent } from './detail/detail.component';
import { ListDechargementComponent } from './list/list-dechargement.component';
import { CampagneNoClosedResolver, CampagneSelectResolver } from '../../../administration/operations/campagne/campagne.resolvers';
import { ExportateurSelectResolver } from '../../../administration/operations/exportateur/exportateur.resolvers';
import { VillesResolver } from '../../../administration/operations/ville/ville.resolvers';
import { SpecificiteSelectResolver } from '../../../administration/operations/specificite/specificite.resolvers';
import { StateChargementResolver } from '../../../administration/operations/required/required.resolvers';
import { EntrepotAssigneSelectResolver } from '../../../administration/operations/entrepot-assigne/entrepot-assigne.resolvers';

export const dechargementRoutes: Route[] = [
  {
    path: '',
    component: DechargementsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListDechargementComponent,
        resolve: {
          campagnes: CampagneSelectResolver
        },
      },
      {
        path: 'new',
        component: CreationComponent,
        resolve: {
          campagnes: CampagneNoClosedResolver,
          provenances: VillesResolver,
          exportateurs: ExportateurSelectResolver,
          entrepots: EntrepotAssigneSelectResolver,
          specificites: SpecificiteSelectResolver,
          statut: StateChargementResolver,
        },
      },
      {
        path: 'detail', component: DetailComponent,
        resolve: {
          campagnes: CampagneNoClosedResolver,
          provenances: VillesResolver,
          exportateurs: ExportateurSelectResolver,
          entrepots: EntrepotAssigneSelectResolver,
          specificites: SpecificiteSelectResolver,
          statut: StateChargementResolver,
        },
        data: null
      },
    ],
  },
];
