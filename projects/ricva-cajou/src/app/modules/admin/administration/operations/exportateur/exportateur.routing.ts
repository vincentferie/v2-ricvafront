import { Route } from '@angular/router';
import { ExportateurComponent } from './exportateur.component';
import { ExportateursResolver } from '../exportateur/exportateur.resolvers';
import { ListExportateurComponent } from './list/list-exportateur.component';
import { DetailExportateurComponent } from './detail/detail-exportateur.component';
import { CreationExportateurComponent } from './creation/creation-exportateur.component';

export const exportateurRoutes: Route[] = [
  {
    path: '',
    component: ExportateurComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListExportateurComponent,
        resolve: {
          exportateurs: ExportateursResolver
        }
      },
      {
        path: 'new',
        component: CreationExportateurComponent
      },
      {
        path: 'detail', component: DetailExportateurComponent
      },
    ],
  },
];
