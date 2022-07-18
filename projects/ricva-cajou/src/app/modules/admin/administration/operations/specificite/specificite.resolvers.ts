import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { SpecificiteService } from './specificite.service';
import { Specificite } from './specificite.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class SpecificitesResolver implements Resolve<any> {

  constructor(private _SpecificiteService: SpecificiteService) {}

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
    specificites: Specificite[];
  }> {
    return this._SpecificiteService.getSpecificites();
  }
}


@Injectable({
  providedIn: 'root',
})
export class SpecificiteSelectResolver implements Resolve<any> {

  constructor(private _SpecificiteService: SpecificiteService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Specificite[]> {
    return this._SpecificiteService.getAll();
  }
}
