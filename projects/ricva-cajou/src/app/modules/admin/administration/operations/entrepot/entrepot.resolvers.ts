import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { Entrepot } from '../entrepot/entrepot.types';
import { EntrepotService } from './entrepot.service';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class EntrepotsResolver implements Resolve<any> {

  constructor(private _EntrepotService: EntrepotService) {}

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
    entrepots: Entrepot[];
  }> {
    return this._EntrepotService.getEntrepots(0, 10);
  }
}

@Injectable({
  providedIn: 'root',
})
export class EntrepotSelectResolver implements Resolve<any> {

  constructor(private _EntrepotService: EntrepotService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Entrepot[]> {
    return this._EntrepotService.getAll();
  }
}
