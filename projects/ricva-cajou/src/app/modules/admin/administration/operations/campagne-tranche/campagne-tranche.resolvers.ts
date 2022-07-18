import { TablePagination } from '@kolab/fuse/src/public-api';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CampagneTrancheService } from './campagne-tranche.service';
import { CampagneTranche } from './campagne-tranche.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class CampagneTranchesResolver implements Resolve<any> {

  constructor(private _CampagneService: CampagneTrancheService) {}

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
    campagnes: CampagneTranche[];
  }> {
    return this._CampagneService.getCampagnes(0, 10);
  }
}
