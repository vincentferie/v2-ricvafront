import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Specificite } from '../specificite/specificite.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SpecificiteService {
  private _specificite: BehaviorSubject<Specificite | null> =
    new BehaviorSubject(null);
  private _specificites: BehaviorSubject<Specificite[] | null> =
    new BehaviorSubject(null);
  private _paginationSpecificite: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'specificity';

  datas: Specificite[] = [
    {
      id: "d49744ea-bf9b-49fe-bead-1628e7866c77",
      libelle: "COVID-19"
    },
    {
      id: "23926122-27ce-4bae-9975-71aad218554a",
      libelle: "Normal"
    },
    {
      id: "538bede0-94fe-4a03-8990-acd671caa949",
      libelle: "Zonning"
    }
  ];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------


  /**
   * Getter for one specificite
   */

  get specificite$(): Observable<Specificite> {
    return this._specificite.asObservable();
  }

  /**
   * Getter for specificites
   */
  get specificites$(): Observable<Specificite[]> {
    // if(environment.production) {
    //   return new Observable<Specificite[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this._specificites.asObservable();
  }

  /**
   * Getter for pagination for specificite cashew
   */
  get paginationSpecificite$(): Observable<TablePagination> {
    return this._paginationSpecificite.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: Specificite): Observable<Specificite> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._specificite.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: Specificite): Observable<Specificite> {
    return this.api._post(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._specificite.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Specificite> {
    return this.api._get(`${this.url}/${id}`).pipe(
      map((response: any) => response?.response.data),
      catchError((error: any) => throwError(error))
    );
  }

  delete(id: string): Observable<any> {
    return this.api._delete(`${this.url}/softdelete/${id}`).pipe(
      tap((response: any) => {
        this._specificites.next(response?.response);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get specificite
   * @param offset
   * @param take
   * @param sort
   * @param order
   */
  getSpecificites(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    specificites: Specificite[];
  }> {
    return this.api
      ._get(`${this.url}/paginate`, {
        params: {
          offset: '' + offset,
          take: '' + take,
          order
        },
      })
      .pipe(
        tap((response: any) => {
          this._paginationSpecificite.next(response?.response.meta);
          this._specificites.next(response?.response.data);
        }),
        map((response: any) => response?.response),
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
    specificites: Specificite[];
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
          this._paginationSpecificite.next(response?.response.meta);
          this._specificites.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Specificite[]> {
    // if(environment.production) {
    //   return new Observable<Specificite[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._specificites.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
