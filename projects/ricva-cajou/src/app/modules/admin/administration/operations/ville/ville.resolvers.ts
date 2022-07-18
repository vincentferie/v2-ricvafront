import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Ville } from './ville.types';
import { VilleService } from './ville.service';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class VillesResolver implements Resolve<any> {

  constructor(private _VilleService: VilleService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ville[]> {
    return this._VilleService.getVilles();
  }
}
