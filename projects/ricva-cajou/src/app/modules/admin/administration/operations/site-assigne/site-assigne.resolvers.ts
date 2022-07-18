import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { SiteAssigneService } from './site-assigne.service';
import { SiteAssigne } from './site-assigne.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class SiteAssignesResolver implements Resolve<any> {

  constructor(private _SiteAssigneService: SiteAssigneService) {}

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
    siteAssignes: SiteAssigne[];
  }> {
    return this._SiteAssigneService.getSiteAssignes(0, 10);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SiteAssigneSelectResolver implements Resolve<any> {

  constructor(private _SiteAssigneService: SiteAssigneService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<SiteAssigne[]> {
    return this._SiteAssigneService.getAll();
  }
}
