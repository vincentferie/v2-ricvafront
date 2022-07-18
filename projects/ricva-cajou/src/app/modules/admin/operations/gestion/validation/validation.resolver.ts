import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { ValidationService } from './validation.service';
import { Validation } from './validation.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class ValidationsResolver implements Resolve<any> {
  
  constructor(private _ValidationService: ValidationService) {}

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
    validations: Validation[];
  }> {
    return this._ValidationService.getValidations(0, 10);
  }
}
