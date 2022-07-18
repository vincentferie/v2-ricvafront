import { Route } from '@angular/router';
import { CampagnesResolver } from '../../../../administration/operations/campagne/campagne.resolvers';
import { EntrepotAssigneSelectResolver } from '../../../../administration/operations/entrepot-assigne/entrepot-assigne.resolvers';
import { EntrepotsResolver } from '../../../../administration/operations/entrepot/entrepot.resolvers';
import { TransitaireSelectResolver } from '../../../../administration/operations/transitaire/transitaire.resolvers';
import { BookingNoClosedResolver, BookingsResolver } from '../../../exports/parking-list/bookings/booking.resolvers';
import { ConteneursResolver } from '../../../exports/parking-list/conteneurs/conteneur.resolvers';
import { EntreposagesResolver } from '../../entreposage/entreposage.resolver';
import { CreationPlanEmpotageComponent } from './creation/creation-plan-empotage.component';
import { DetailPlanEmpotageComponent } from './detail/detail-plan-empotage.component';
import { ListPlanEmpotageComponent } from './list/list-plan-empotage.component';
import { PlanEmpotageComponent } from './plan-empotage.component';
import { PlanEmpotagesResolver } from './plan-empotage.resolver';

export const planEmpotageRoutes: Route[] = [
  {
    path: '',
    component: PlanEmpotageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListPlanEmpotageComponent,
        resolve: {
          planEmpotages: PlanEmpotagesResolver,
        },
      },
      {
        path: 'new',
        component: CreationPlanEmpotageComponent,
        resolve: {
          bookings: BookingNoClosedResolver,
          entrepots: EntrepotAssigneSelectResolver,
          transitaires: TransitaireSelectResolver,
        },
      },
      {
        path: 'detail', component: DetailPlanEmpotageComponent,
        resolve: {
          bookings: BookingsResolver,
          entrepots: EntrepotsResolver,
          conteneurs: ConteneursResolver,
          lots: EntreposagesResolver,
        },
      },
    ],
  },
];
