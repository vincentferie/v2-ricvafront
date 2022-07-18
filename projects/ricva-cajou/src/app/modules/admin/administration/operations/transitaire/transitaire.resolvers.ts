import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { Transitaire } from '../transitaire/transitaire.types';
import { TransitaireService } from './transitaire.service';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class TransitairesResolver implements Resolve<any> {
  
  constructor(private _TransitaireService: TransitaireService) {}
  
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
    transitaires: Transitaire[];
  }> {
    return this._TransitaireService.getTransitaires(0, 10);
  }
}


@Injectable({
  providedIn: 'root',
})
export class TransitaireSelectResolver implements Resolve<any> {

  constructor(private _TransitaireService: TransitaireService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Transitaire[]> {
    return this._TransitaireService.getAll();
  }
}
