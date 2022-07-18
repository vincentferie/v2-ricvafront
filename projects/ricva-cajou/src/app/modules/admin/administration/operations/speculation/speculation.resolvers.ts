import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { SpeculationService } from './speculation.service';
import { Speculation, SpeculationPagination } from './speculation.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class SpeculationResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(
    private _SpeculationService: SpeculationService,
    private _router: Router
  ) {}

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
  ): Observable<Speculation> {
    return this._SpeculationService
      .getSpeculationById(route.paramMap.get('id'))
      .pipe(
        // Error here means the requested product is not available
        catchError((error) => {
          // Log the error
          console.error(error);

          // Get the parent url
          const parentUrl = state.url.split('/').slice(0, -1).join('/');

          // Navigate to there
          this._router.navigateByUrl(parentUrl);

          // Throw an error
          return throwError(error);
        })
      );
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpeculationsResolver implements Resolve<any> {
  /**
   * Constructor
   */
  constructor(private _SpeculationService: SpeculationService) {}

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
    pagination: SpeculationPagination;
    speculations: Speculation[];
  }> {
    return this._SpeculationService.getSpeculations();
  }
}
