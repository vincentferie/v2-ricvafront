import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { BillOfLanding } from './bill-of-landing.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BillOfLandingService {
  billOfLanding: BillOfLanding;
  private _billOfLanding: BehaviorSubject<BillOfLanding | null> =
    new BehaviorSubject(null);
  private _billOfLandings: BehaviorSubject<BillOfLanding[] | null> =
    new BehaviorSubject(null);
  private _paginationBillOfLanding: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = "bill-of-lading";

  datas: BillOfLanding[] = []

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setBillOfLanding(billOfLanding: BillOfLanding) {
    this.billOfLanding = billOfLanding;
  }

  getBillOfLanding(): BillOfLanding {
    return this.billOfLanding;
  }

  /**
   * Getter for one billOfLanding
   */
  get billOfLanding$(): Observable<BillOfLanding> {
    return this._billOfLanding.asObservable();
  }

  /**
   * Getter for billOfLandings
   */
  get billOfLandings$(): Observable<BillOfLanding[]> {
    if(environment.production) {
      return new Observable<BillOfLanding[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this._billOfLandings.asObservable();
  }

  /**
   * Getter for pagination for billOfLanding cashew
   */
  get paginationBillOfLanding$(): Observable<TablePagination> {
    return this._paginationBillOfLanding.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: BillOfLanding): Observable<BillOfLanding> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._billOfLanding.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: BillOfLanding): Observable<BillOfLanding> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._billOfLanding.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<BillOfLanding> {
    if(environment.production) {
      return new Observable<BillOfLanding>(obs => {
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
        this._billOfLandings.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get billOfLanding
   * @param offset
   * @param take
   * @param order
   */
  getBillOfLandings(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    billOfLandings: BillOfLanding[];
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
          this._paginationBillOfLanding.next(response?.response.meta);
          this._billOfLandings.next(response?.response.data);
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
    billOfLandings: BillOfLanding[];
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
          this._paginationBillOfLanding.next(response?.response.meta);
          this._billOfLandings.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<BillOfLanding[]> {
    if(environment.production) {
      return new Observable<BillOfLanding[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._billOfLandings.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
