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
import { Superviseur } from '../superviseur/superviseur.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';

@Injectable({
  providedIn: 'root',
})
export class SuperviseurService {
  superviseur: Superviseur;
  private _superviseur: BehaviorSubject<Superviseur | null> =
    new BehaviorSubject(null);
  private _superviseurs: BehaviorSubject<Superviseur[] | null> =
    new BehaviorSubject(null);
  private _paginationSuperviseur: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'accounts';

  datas: Superviseur[] = [
    {
      "id": "e144740e-ae04-4703-af94-bb52277f7fc7",
      "role_id": "fe931208-2e32-46ef-970a-7ac954b9f30c",
      "nom": "Coulibaly",
      "prenoms": "Lohofolo",
      "contact": "+2250909090909",
      "username": "admin@capsikanci.com",
      "password": "$2b$10$OvQDdYEQNg.1LPIEVwlaNeLgE9bzspJbPsvLvqfQ.gJE7BVe2ML1C",
      "salt": "$2b$10$OvQDdYEQNg.1LPIEVwlaNe",
      "rule": {
        "libelle": "admin"
      }
    }
  ];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setSuperviseur(superviseur: Superviseur) {
    this.superviseur = superviseur;
  }

  getSuperviseur(): Superviseur {
    return this.superviseur;
  }

  /**
   * Getter for one superviseur
   */
  get superviseur$(): Observable<Superviseur> {
    return this._superviseur.asObservable();
  }

  /**
   * Getter for superviseurs
   */
  get superviseurs$(): Observable<Superviseur[]> {
    if(environment.production) {
      return new Observable<Superviseur[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this._superviseurs.asObservable();
  }

  /**
   * Getter for pagination for superviseur cashew
   */
  get paginationSuperviseur$(): Observable<TablePagination> {
    return this._paginationSuperviseur.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create superviseur
   */
  create(data: Superviseur): Observable<Superviseur> {
    return this.api
      ._post(`${this.url}`, data)
      .pipe(
        tap((response: any) => {
          this._superviseur.next(response?.response.data);
        }),
        map((response: any) => response?.response),
        catchError((error: any) => throwError(error))
      );
  }

  update(data: Superviseur): Observable<Superviseur> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._superviseur.next(response?.response.data);
      }),
      map((response: any) => response.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Superviseur> {
    return this.api._get(`${this.url}/${id}`).pipe(
      tap((response: any) => {
        this._superviseur.next(response.response.data);
      }),
      map((response: any) => response.response.data),
      catchError((error: any) => throwError(error))
    );
  }

  delete(id: string): Observable<any> {
    return this.api._delete(`${this.url}/softdelete/${id}`).pipe(
      tap((response: any) => {
        this._superviseur.next(response?.response?.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get superviseur
   * @param offset
   * @param take
   * @param order
   */
  getSuperviseurs(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    superviseurs: Superviseur[];
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
          this._paginationSuperviseur.next(response?.response.meta);
          this._superviseurs.next(response?.response.data);
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
    superviseurs: Superviseur[];
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
          this._paginationSuperviseur.next(response?.response.meta);
          this._superviseurs.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Superviseur[]> {
    if(environment.production) {
      return new Observable<Superviseur[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._superviseurs.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
