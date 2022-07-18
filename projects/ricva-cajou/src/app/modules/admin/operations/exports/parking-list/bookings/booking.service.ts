import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Booking } from './booking.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  booking: Booking
  private _booking: BehaviorSubject<Booking | null> =
    new BehaviorSubject(null);
  private _bookings: BehaviorSubject<Booking[] | null> =
    new BehaviorSubject(null);
  private _paginationBooking: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'booking';

  datas: Booking[] = [
    {
      "id": "99b7e594-82b4-4269-87ce-947b04a63e0f",
      "numero_reel": "0588",
      "numero_change": "0405558888",
      "state": 0,
      "file": null
    }
  ];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setBooking(booking: Booking) {
    this.booking = booking;
  }

  getBooking(): Booking {
    return this.booking;
  }

  /**
   * Getter for one booking
   */
  get booking$(): Observable<Booking> {
    return this._booking.asObservable();
  }

  /**
   * Getter for bookings
   */

  get bookings$(): Observable<Booking[]> {
    // if(environment.production) {
    //   return new Observable<Booking[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this._bookings.asObservable();
  }

  /**
   * Getter for pagination for booking cashew
   */
  get paginationBooking$(): Observable<TablePagination> {
    return this._paginationBooking.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: Booking): Observable<Booking> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._booking.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: Booking): Observable<Booking> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._booking.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Booking> {
    if(environment.production) {
      return new Observable<Booking>(obs => {
        obs.next(this.datas.find(res => res.id === id));
      });
    }
    return this.api._get(`${this.url}/${id}`).pipe(
      map((response: any) => response?.response.data),
      catchError((error: any) => throwError(error))
    );
  }

  delete(id: string): Observable<any> {
    return this.api._delete(`${this.url}/softdelete/${id}`).pipe(
      tap((response: any) => {
        this._bookings.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get booking
   * @param offset
   * @param take
   * @param order
   */
  getBookings(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    bookings: Booking[];
  }> {
    return this.api
      ._get(`${this.url}/paginate`,
      {
        offset: offset,
        take: take,
        order
      })
      .pipe(
        tap((response: any) => {
          this._paginationBooking.next(response?.response.meta);
          this._bookings.next(response?.response.data);
        }),
        map((response: any) => response),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get paginate query
   * @param offset
   * @param take
   * @param order
   * @param query
   * @param filter_id
   */
  getQuery(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc',
    query: string = '',
    filter_id: string = '',
  ): Observable<{
    pagination: TablePagination;
    bookings: Booking[];
  }> {
    return this.api
      ._get(`${this.url}/paginate/query`,
      {
        offset: offset,
        take: take,
        order,
        query,
        filter_id,
      })
      .pipe(
        tap((response: any) => {
          this._paginationBooking.next(response?.response.meta);
          this._bookings.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get booking non fermé
   */
   getNoClosed(): Observable<Booking[]> {
    // if(environment.production) {
    //   return new Observable<Booking[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}/not-closed`)
      .pipe(
        tap((response: any) => {
          this._bookings.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Booking[]> {
    // if(environment.production) {
    //   return new Observable<Booking[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._bookings.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
