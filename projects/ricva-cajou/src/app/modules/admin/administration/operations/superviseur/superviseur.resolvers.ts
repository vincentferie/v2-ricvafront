import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { SuperviseurService } from './superviseur.service';
import { Superviseur } from './superviseur.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class SuperviseursResolver implements Resolve<any> {

  constructor(private _SuperviseurService: SuperviseurService) {}

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
    superviseurs: Superviseur[];
  }> {
    return this._SuperviseurService.getSuperviseurs(0, 10);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SuperviseurSelectResolver implements Resolve<any> {

  constructor(private _SuperviseurService: SuperviseurService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Superviseur[]> {
    return this._SuperviseurService.getAll();
  }
}
