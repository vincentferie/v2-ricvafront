import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { ExecutionService } from './execution.service';
import { Execution } from './execution.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class ExecutionsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _ExecutionService: ExecutionService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    pagination: TablePagination;
    executions: Execution[];
  }> {
    return this._ExecutionService.getExecutions();
  }
}
