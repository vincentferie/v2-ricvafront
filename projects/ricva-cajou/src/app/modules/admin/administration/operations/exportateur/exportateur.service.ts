import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {
  Exportateur,
} from './exportateur.types';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExportateurService {
  exportateur: Exportateur;
  private _exportateur: BehaviorSubject<Exportateur | null> =
    new BehaviorSubject(null);
  private _exportateurs: BehaviorSubject<Exportateur[] | null> =
    new BehaviorSubject(null);
  private _paginationExportateur: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'exporter';

  datas: Exportateur[] = [
    {
      id: "88e3630d-907e-4c86-aaa7-3a8a7a7e79a5",
      raison: "CABN"
    }
  ];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setExportateur(entrepot: Exportateur) {
    this.exportateur = entrepot;
  }

  getExportateur(): Exportateur {
    return this.exportateur;
  }

  /**
   * Getter for one exportateur
   */

  get exportateur$(): Observable<Exportateur> {
    return this._exportateur.asObservable();
  }

  /**
   * Getter for exportateurs
   */

  get exportateurs$(): Observable<Exportateur[]> {
    // if(environment.production) {
    //   return new Observable<Exportateur[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this._exportateurs.asObservable();
  }

  /**
   * Getter for pagination for exportateur cashew
   */
  get paginationExportateur$(): Observable<TablePagination> {
    return this._paginationExportateur.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * create exportateur
   */
  create(data: Exportateur): Observable<Exportateur> {
    return this.api
      ._post(`${this.url}`, data)
      .pipe(
        tap((response: any) => {
          this._exportateur.next(response?.response.data);
        }),
        map((response: any) => response?.response),
        catchError((error: any) => throwError(error))
      );
  }

  update(data: Exportateur): Observable<Exportateur> {
    return this.api
      ._patch(`${this.url}/edit/${data.id}`, data)
      .pipe(
        tap((response: any) => {
          this._exportateur.next(response?.response.data);
        }),
        map((response: any) => response?.response),
        catchError((error: any) => throwError(error))
      );
  }

  getSingle(id: string): Observable<Exportateur> {
    return this.api._get(`${this.url}/${id}`).pipe(
      tap((response: any) => {
        this._exportateur.next(response.response.data);
      }),
      map((response: any) => response.response.data),
      catchError((error: any) => throwError(error))
    );
  }

  delete(id: string): Observable<any> {
    return this.api._delete(`${this.url}/softdelete/${id}`).pipe(
      tap((response: any) => {
        this._exportateur.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get exportateur
   * @param offset
   * @param take
   * @param order
   */
  getExportateurs(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    exportateurs: Exportateur[];
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
          this._paginationExportateur.next(response?.response.meta);
          this._exportateurs.next(response?.response.data);
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
    exportateurs: Exportateur[];
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
          this._paginationExportateur.next(response?.response.meta);
          this._exportateurs.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Exportateur[]> {
    // if(environment.production) {
    //   return new Observable<Exportateur[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._exportateurs.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
