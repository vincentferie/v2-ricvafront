import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SuperviseurService } from './superviseur.service';

@Injectable({
  providedIn: 'root',
})
export class SuperviseurResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _superviseurService: SuperviseurService) {}

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
  ): Observable<any> {
    return this._superviseurService.getData();
  }
}
