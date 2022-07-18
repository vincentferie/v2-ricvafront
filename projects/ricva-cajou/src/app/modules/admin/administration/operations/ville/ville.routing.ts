import { Route } from '@angular/router';
import { VillesResolver } from '../ville/ville.resolvers';
import { DetailVilleComponent } from './detail/detail-ville.component';
import { ListVilleComponent } from './list/list-ville.component';
import { VilleComponent } from './ville.component';

export const villeRoutes: Route[] = [
  {
    path: '',
    component: VilleComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListVilleComponent,
        resolve: {
          villes: VillesResolver
        }
      },
      {
        path: 'detail', component: DetailVilleComponent
      },
    ],
  },
];
