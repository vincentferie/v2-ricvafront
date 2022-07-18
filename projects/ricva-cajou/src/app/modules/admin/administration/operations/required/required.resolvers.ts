import { CampagneRequired } from './required.types';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StateBooking } from '../../../operations/exports/parking-list/bookings/booking.types';
import { StateType } from '../../../operations/exports/parking-list/conteneurs/conteneur.types';
import { StateChargement } from '../../../operations/gestion/dechargements/dechargement.types';
import { StateLots } from '../../../operations/gestion/entreposage/entreposage.types';
import { RequiredService } from './required.service';
import { Globale } from '@kolab/fuse/src/lib/services/globale';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class CampagneRequiredResolver implements Resolve<any> {

  constructor(private _RequiredService: RequiredService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CampagneRequired[]> {
    return this._RequiredService.getCampagnes(Globale.speculation_id);
  }
}

@Injectable({
  providedIn: 'root',
})
export class StateChargementResolver implements Resolve<any> {

  constructor(private _RequiredService: RequiredService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StateChargement> {
    return this._RequiredService.getStateChargement();
  }
}

@Injectable({
  providedIn: 'root',
})
export class StateTypeResolver implements Resolve<any> {

  constructor(private _RequiredService: RequiredService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StateType> {
    return this._RequiredService.getStateType();
  }
}

@Injectable({
  providedIn: 'root',
})
export class StateBookingResolver implements Resolve<any> {

  constructor(private _RequiredService: RequiredService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StateBooking> {
    return this._RequiredService.getStateBooking();
  }
}

@Injectable({
  providedIn: 'root',
})
export class StateLotsResolver implements Resolve<any> {

  constructor(private _RequiredService: RequiredService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<StateLots> {
    return this._RequiredService.getStateLots();
  }
}
