import { Route } from '@angular/router';
import { EntreposagesResolver } from '../../entreposage/entreposage.resolver';
import { CreationExecutionComponent } from './creation/creation-execution.component';
import { DetailExecutionComponent } from './detail/detail-execution.component';
import { ExecutionComponent } from './execution.component';
import { ExecutionsResolver } from './execution.resolver';
import { ListExecutionComponent } from './list/list-execution.component';

export const executionRoutes: Route[] = [
  {
    path: '',
    component: ExecutionComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        component: ListExecutionComponent,
        resolve: {
          executions: ExecutionsResolver,
        },
      },
      {
        path: 'new',
        component: CreationExecutionComponent,
        resolve: {
          lots: EntreposagesResolver,
        },
      },
      {
        path: 'detail', component: DetailExecutionComponent
      },
    ],
  },
];
