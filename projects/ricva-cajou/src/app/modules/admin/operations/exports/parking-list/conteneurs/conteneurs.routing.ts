import { Route } from '@angular/router';
import { EntrepotAssigneSelectResolver } from '../../../../administration/operations/entrepot-assigne/entrepot-assigne.resolvers';
import { StateTypeResolver } from '../../../../administration/operations/required/required.resolvers';
import { BookingSelectResolver } from '../bookings/booking.resolvers';
import { ConteneursResolver } from './conteneur.resolvers';
import { ConteneursComponent } from './conteneurs.component';
import { CreationConteneurComponent } from './creation/creation-conteneur.component';
import { DetailConteneurComponent } from './detail/detail-conteneur.component';
import { ListConteneurComponent } from './list/list-conteneur.component';

export const conteneurRoutes: Route[] = [
  {
    path: '',
    component: ConteneursComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListConteneurComponent,
        resolve: {
          conteneurs: ConteneursResolver,
        },
      },
      {
        path: 'new',
        component: CreationConteneurComponent,
        resolve: {
          bookings: BookingSelectResolver,
          entrepots: EntrepotAssigneSelectResolver,
          types: StateTypeResolver,
        },
      },
      {
        path: 'detail', component: DetailConteneurComponent,
        resolve: {
          bookings: BookingSelectResolver,
          entrepots: EntrepotAssigneSelectResolver,
          types: StateTypeResolver,
        },
      },
    ],
  },
];
