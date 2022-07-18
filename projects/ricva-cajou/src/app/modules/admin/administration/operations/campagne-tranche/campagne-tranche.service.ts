import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { CampagneTranche } from './campagne-tranche.types';

@Injectable({
  providedIn: 'root',
})
export class CampagneTrancheService {
  campagne: CampagneTranche;
  private _campagne: BehaviorSubject<CampagneTranche | null> =
    new BehaviorSubject(null);
  private _campagnes: BehaviorSubject<CampagneTranche[] | null> =
    new BehaviorSubject(null);
  private _paginationCampagne: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'campagne-tranche';

  datas: CampagneTranche[] = [];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setCampagne(campagne: CampagneTranche) {
    this.campagne = campagne;
  }

  getCampagne(): CampagneTranche {
    return this.campagne;
  }

  /**
   * Getter for one campagne
   */
  get campagne$(): Observable<CampagneTranche> {
    return this._campagne.asObservable();
  }

  /**
   * Getter for campagnes
   */
  get campagnes$(): Observable<CampagneTranche[]> {
    return this._campagnes.asObservable();
  }

  /**
   * Getter for pagination for campagne cashew
   */
  get paginationCampagne$(): Observable<TablePagination> {
    return this._paginationCampagne.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create campagne
   */
  create(data: CampagneTranche): Observable<CampagneTranche> {
    return this.api
      ._post(`${this.url}`, data)
      .pipe(
        tap((response: any) => {
          this._campagne.next(response?.response.data);
        }),
        map((response: any) => response?.response),
        catchError((error: any) => throwError(error))
      );
  }

  update(data: CampagneTranche): Observable<CampagneTranche> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._campagne.next(response?.response.data);
      }),
      map((response: any) => response.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<CampagneTranche> {
    return this.api._get(`${this.url}/${id}`).pipe(
      tap((response: any) => {
        this._campagne.next(response.response.data);
      }),
      map((response: any) => response.response.data),
      catchError((error: any) => throwError(error))
    );
  }

  delete(id: string): Observable<any> {
    return this.api._delete(`${this.url}/softdelete/${id}`).pipe(
      tap((response: any) => {
        this._campagne.next(response?.response?.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get campagne
   * @param offset
   * @param take
   * @param order
   */
  getCampagnes(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    campagnes: CampagneTranche[];
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
          this._paginationCampagne.next(response?.response.meta);
          this._campagnes.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get paginate query
   * @param offset
   * @param take
   * @param order
   * @param query
   */
  getQuery(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc',
    query: string = ''
  ): Observable<{
    pagination: TablePagination;
    campagnes: CampagneTranche[];
  }> {
    return this.api
      ._get(`${this.url}/paginate/query`,
      {
        offset: offset,
        take: take,
        order,
        query,
      })
      .pipe(
        tap((response: any) => {
          this._paginationCampagne.next(response?.response.meta);
          this._campagnes.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<CampagneTranche[]> {
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._campagnes.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
