import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { DechargementService } from './dechargement.service';
import { Dechargement } from './dechargement.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class DechargementsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _DechargementService: DechargementService) {}

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
    dechargements: Dechargement[];
  }> {
    return this._DechargementService.getDechargements(0, 10, 'asc');
  }
}

@Injectable({
  providedIn: 'root',
})
export class DechargementSelectResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _DechargementService: DechargementService) {}

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
  ): Observable<Dechargement[]> {
    return this._DechargementService.getAll();
  }
}
