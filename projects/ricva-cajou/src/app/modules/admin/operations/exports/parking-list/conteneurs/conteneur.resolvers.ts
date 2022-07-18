import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { ConteneurService } from './conteneur.service';
import { Conteneur} from './conteneur.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class ConteneursResolver implements Resolve<any> {

  constructor(private _ConteneurService: ConteneurService) {}

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
    conteneurs: Conteneur[];
  }> {
    return this._ConteneurService.getConteneurs(0, 10);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ConteneurNoBillLandingResolver implements Resolve<any> {

  constructor(private _ConteneurService: ConteneurService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Conteneur[]> {
    return this._ConteneurService.getNoBillLanding();
  }
}

@Injectable({
  providedIn: 'root',
})
export class ConteneurSelectResolver implements Resolve<any> {

  constructor(private _ConteneurService: ConteneurService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Conteneur[]> {
    return this._ConteneurService.getAll();
  }
}
