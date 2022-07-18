import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { EntreposageService } from './entreposage.service';
import { Entreposage } from './entreposage.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class EntreposagesResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _EntreposageService: EntreposageService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

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
    entreposages: Entreposage[];
  }> {
    return this._EntreposageService.getEntreposages(0, 10);
  }
}
