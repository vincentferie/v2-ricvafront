import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { EntrepotAssigneService } from './entrepot-assigne.service';
import { EntrepotAssigne } from './entrepot-assigne.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class EntrepotAssignesResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _EntrepotAssigneService: EntrepotAssigneService) {}

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
    entrepotAssignes: EntrepotAssigne[];
  }> {
    return this._EntrepotAssigneService.getEntrepotAssignes(0, 10);
  }
}

@Injectable({
  providedIn: 'root',
})
export class EntrepotAssigneSelectResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _EntrepotAssigneService: EntrepotAssigneService) {}

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
  ): Observable<EntrepotAssigne[]> {
    return this._EntrepotAssigneService.getAll();
  }
}
