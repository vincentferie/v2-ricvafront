import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Exportateur } from '../exportateur/exportateur.types';
import { ExportateurService } from '../exportateur/exportateur.service';
import { TablePagination } from '@kolab/fuse/src/public-api';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class ExportateursResolver implements Resolve<any> {

  constructor(private _ExportateurService: ExportateurService) {}

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
    exportateurs: Exportateur[];
  }> {
    return this._ExportateurService.getExportateurs(0, 10);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ExportateurSelectResolver implements Resolve<any> {

  constructor(private _ExportateurService: ExportateurService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Exportateur[]> {
    return this._ExportateurService.getAll();
  }
}
