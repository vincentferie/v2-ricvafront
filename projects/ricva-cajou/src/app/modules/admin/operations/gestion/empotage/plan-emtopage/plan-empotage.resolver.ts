import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { PlanEmpotageService } from './plan-empotage.service';
import { PlanEmpotage } from './plan-empotage.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class PlanEmpotagesResolver implements Resolve<any> {
  
  constructor(private _PlanEmpotageService: PlanEmpotageService) {}
  
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
    planEmpotages: PlanEmpotage[];
  }> {
    return this._PlanEmpotageService.getPlanEmpotages(0, 10);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PlanEmpotageSelectResolver implements Resolve<any> {
  
  constructor(private _PlanEmpotageService: PlanEmpotageService) {}
  
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PlanEmpotage[]> {
    return this._PlanEmpotageService.getAll();
  }
}
