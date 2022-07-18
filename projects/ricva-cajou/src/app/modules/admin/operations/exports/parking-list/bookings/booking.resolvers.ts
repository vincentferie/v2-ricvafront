import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { BookingService } from './booking.service';
import { Booking } from './booking.types';

//------------***************************------------------

@Injectable({
  providedIn: 'root',
})
export class BookingsResolver implements Resolve<any> {

  constructor(private _BookingService: BookingService) {}

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
    bookings: Booking[];
  }> {
    return this._BookingService.getBookings(0, 10);
  }
}

@Injectable({
  providedIn: 'root',
})
export class BookingSelectResolver implements Resolve<any> {

  constructor(private _BookingService: BookingService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Booking[]> {
    return this._BookingService.getAll();
  }
}

@Injectable({
  providedIn: 'root',
})
export class BookingNoClosedResolver implements Resolve<any> {

  constructor(private _BookingService: BookingService) {}

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Booking[]> {
    return this._BookingService.getNoClosed();
  }
}

