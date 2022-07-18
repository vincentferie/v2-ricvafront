import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { CampagneOutturnService } from './campagne-outturn.service';
import { CampagneOutturn } from './campagne-outturn.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class CampagneOutturnsResolver implements Resolve<any> {

  constructor(private _CampagneService: CampagneOutturnService) {}

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
    campagnes: CampagneOutturn[];
  }> {
    return this._CampagneService.getCampagnes(0, 10);
  }
}
