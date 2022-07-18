import { Route } from '@angular/router';
import { StateBookingResolver } from '../../../../administration/operations/required/required.resolvers';
import { BookingsResolver } from './booking.resolvers';
import { BookingsComponent } from './bookings.component';
import { CreationBookingComponent } from './creation/creation-booking.component';
import { DetailBookingComponent } from './detail/detail-booking.component';
import { ListBookingComponent } from './list/list-booking.component';

export const bookingRoutes: Route[] = [
  {
    path: '',
    component: BookingsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListBookingComponent,
        resolve: {
          bookings: BookingsResolver,
        },
      },
      {
        path: 'new',
        component: CreationBookingComponent,
        resolve: {
          states: StateBookingResolver,
        },
      },
      {
        path: 'detail', component: DetailBookingComponent,
        resolve: {
          states: StateBookingResolver,
        },
      },
    ],
  },
];
