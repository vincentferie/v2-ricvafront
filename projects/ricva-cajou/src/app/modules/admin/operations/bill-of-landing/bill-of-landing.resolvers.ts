import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { BillOfLandingService } from './bill-of-landing.service';
import {
  BillOfLanding,
} from './bill-of-landing.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class BillOfLandingsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _BillOfLandingService: BillOfLandingService) {}

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
    billOfLandings: BillOfLanding[];
  }> {
    return this._BillOfLandingService.getBillOfLandings(0, 10);
  }
}
