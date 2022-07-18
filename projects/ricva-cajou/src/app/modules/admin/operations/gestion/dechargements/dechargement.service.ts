import { environment } from '@ricva-cajou/src/environments/environment';
import { ApiService } from './../../../../../core/utils/api.service';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Dechargement } from './dechargement.types';
import { TablePagination } from '@kolab/fuse/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class DechargementService {
  dechargement: Dechargement;
  private _dechargement: BehaviorSubject<Dechargement | null> =
    new BehaviorSubject(null);
  private _dechargements: BehaviorSubject<Dechargement[] | null> =
    new BehaviorSubject(null);
  private _paginationDechargement: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'unloading';

  datas: Dechargement[] = [];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setDechargement(dechargement: Dechargement) {
    this.dechargement = dechargement;
  }

  getDechargement(): Dechargement {
    return this.dechargement;
  }

  get dechargement$(): Observable<Dechargement> {
    return this._dechargement.asObservable();
  }

  get dechargements$(): Observable<Dechargement[]> {
    // if(environment.production) {
    //   return new Observable<Dechargement[]>(obs => {
    //     this._dechargements.next(this.datas);
    //   });
    // }
    return this._dechargements.asObservable();
  }

  get paginationDechargement$(): Observable<TablePagination> {
    return this._paginationDechargement.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: Dechargement): Observable<Dechargement> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._dechargement.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: Dechargement): Observable<Dechargement> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._dechargement.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Dechargement> {
    if(environment.production) {
      return new Observable<Dechargement>(obs => {
        this._dechargement.next(this.datas.find(res => res.id === id));
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
        this._dechargements.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get dechargement
   * @param offset
   * @param take
   * @param order
   */
  getDechargements(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    dechargements: Dechargement[];
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
          this._paginationDechargement.next(response?.response.meta);
          this._dechargements.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
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
    query: string = '',
  ): Observable<{
    pagination: TablePagination;
    dechargements: Dechargement[];
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
          this._paginationDechargement.next(response?.response.meta);
          this._dechargements.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get dechargement
   * @param offset
   * @param take
   * @param order
   * @param query
   * @param filter_id
   */
  getFilter(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc',
    query: string = '',
    filter_id: string = ''
  ): Observable<{
    pagination: TablePagination;
    dechargements: Dechargement[];
  }> {
    return this.api
      ._get(`${this.url}/paginate`,
      {
        offset: offset,
        take: take,
        order,
        query,
        filter_id,
      })
      .pipe(
        tap((response: any) => {
          this._paginationDechargement.next(response?.response.meta);
          this._dechargements.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get les dechargement non utilisé dans le cadre entreposage
   * @param filter_id
   */
  getUnused(filter_id: string = ''): Observable<Dechargement[]> {
    return this.api
      ._get(`${this.url}/unused`,
      {filter_id})
      .pipe(
        tap((response: any) => {
          this._dechargements.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get dechargement existing
   * @param query
   * @param filter_id
   */
  getExisting(
    query: string = '',
    filter_id: string = ''
  ): Observable<Dechargement[]> {
    return this.api
      ._get(`${this.url}/existing`,
      {
        query,
        filter_id,
      })
      .pipe(
        tap((response: any) => {
          this._dechargements.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Dechargement[]> {
    // if(environment.production) {
    //   return new Observable<Dechargement[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._dechargements.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
