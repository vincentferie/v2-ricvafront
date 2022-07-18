import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { CampagneService } from './campagne.service';
import { Campagne } from './campagne.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class CampagnesResolver implements Resolve<any> {

  constructor(private _CampagneService: CampagneService) {}

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
    campagnes: Campagne[];
  }> {
    return this._CampagneService.getCampagnes(0, 10);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CampagneSelectResolver implements Resolve<any> {

  constructor(private _CampagneService: CampagneService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Campagne[]> {
    return this._CampagneService.getAll();
  }
}

@Injectable({
  providedIn: 'root',
})
export class CampagneNoClosedResolver implements Resolve<any> {

  constructor(private _CampagneService: CampagneService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Campagne[]> {
    return this._CampagneService.getNoClosed();
  }
}
