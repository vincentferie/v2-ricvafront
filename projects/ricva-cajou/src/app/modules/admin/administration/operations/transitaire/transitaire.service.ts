import { environment } from '@ricva-cajou/src/environments/environment';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { Transitaire } from '../transitaire/transitaire.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';

@Injectable({
  providedIn: 'root',
})
export class TransitaireService {
  transitaire: Transitaire;
  private _transitaire: BehaviorSubject<Transitaire | null> =
    new BehaviorSubject(null);
  private _transitaires: BehaviorSubject<Transitaire[] | null> =
    new BehaviorSubject(null);
  private _paginationTransitaire: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'forwarder';

  datas: Transitaire[] = [];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setTransitaire(transitaire: Transitaire) {
    this.transitaire = transitaire;
  }

  getTransitaire(): Transitaire {
    return this.transitaire;
  }

  /**
   * Getter for one transitaire
   */

  get transitaire$(): Observable<Transitaire> {
    return this._transitaire.asObservable();
  }

  /**
   * Getter for transitaires
   */

  get transitaires$(): Observable<Transitaire[]> {
    if(environment.production) {
      return new Observable<Transitaire[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this._transitaires.asObservable();
  }

  /**
   * Getter for pagination for transitaire cashew
   */
  get paginationTransitaire$(): Observable<TablePagination> {
    return this._paginationTransitaire.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: Transitaire): Observable<Transitaire> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._transitaire.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: Transitaire): Observable<Transitaire> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._transitaire.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Transitaire> {
    if(environment.production) {
      return new Observable<Transitaire>(obs => {
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
        this._transitaires.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get transitaire
   * @param offset
   * @param take
   * @param order
   */
  getTransitaires(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    transitaires: Transitaire[];
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
          this._paginationTransitaire.next(response?.response.meta);
          this._transitaires.next(response?.response.data);
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
    filter_id: string = ''
  ): Observable<{
    pagination: TablePagination;
    transitaires: Transitaire[];
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
          this._paginationTransitaire.next(response?.response.meta);
          this._transitaires.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Transitaire[]> {
    if(environment.production) {
      return new Observable<Transitaire[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._transitaires.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
