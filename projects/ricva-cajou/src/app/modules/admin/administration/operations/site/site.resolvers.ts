import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { Site } from '../site/site.types';
import { SiteService } from './site.service';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class SitesResolver implements Resolve<any> {
  
  constructor(private _SiteService: SiteService) {}
  
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
    sites: Site[];
  }> {
    return this._SiteService.getSites(0, 10);
  }
}


@Injectable({
  providedIn: 'root',
})
export class SiteSelectResolver implements Resolve<any> {

  constructor(private _SiteService: SiteService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Site[]> {
    return this._SiteService.getAll();
  }
}
