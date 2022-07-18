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
import { Conteneur, Plomb } from './conteneur.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConteneurService {
  conteneur: Conteneur;
  private _conteneur: BehaviorSubject<Conteneur | null> =
    new BehaviorSubject(null);
  private _conteneurs: BehaviorSubject<Conteneur[] | null> =
    new BehaviorSubject(null);
  private _paginationConteneur: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  // LIAISON
  plomb: Plomb;
  private _plomb: BehaviorSubject<Plomb | null> =
  new BehaviorSubject(null);

  //URL
  private url = 'container';

  datas: Conteneur[] = [
    {
      "id": "ce13d82b-a7e3-4ce5-9a8d-3c0515a7e3cc",
      "booking_id": "99b7e594-82b4-4269-87ce-947b04a63e0f",
      "entrepot_id": "3f282f4b-8239-4f1e-9fca-80916346f064",
      "numero": "5866200",
      "type_tc": "20’",
      "capacite": 399,
      "entrepot": {
          "id": "3f282f4b-8239-4f1e-9fca-80916346f064",
          "site_id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
          "libelle": "Diaouné & Frère 2",
          "superficie": 8,
          "coordonneex": 4,
          "coordonneey": 4
      },
      "booking": {
          "id": "99b7e594-82b4-4269-87ce-947b04a63e0f",
          "numero_reel": "05882",
          "numero_change": "0405558888",
          "state": 0
      },
      "plomb": {
          "id": "65bc7e6f-945d-4056-a49e-68230ca478b5",
          "conteneur_id": "ce13d82b-a7e3-4ce5-9a8d-3c0515a7e3cc",
          "pb_lettre": "Cent un",
          "pb_chiffre": 101
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

  setConteneur(conteneur: Conteneur) {
    this.conteneur = conteneur;
  }

  getConteneur(): Conteneur {
    return this.conteneur;
  }

  setPlomb(plomb: Plomb) {
    this.plomb = plomb;
  }

  getPlomb(): Plomb {
    return this.plomb;
  }

  /**
   * Getter for one conteneur
   */
  get conteneur$(): Observable<Conteneur> {
    return this._conteneur.asObservable();
  }

  /**
   * Getter for conteneurs
   */
  get conteneurs$(): Observable<Conteneur[]> {
    if(environment.production) {
      return new Observable<Conteneur[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this._conteneurs.asObservable();
  }

  /**
   * Getter for pagination for conteneur cashew
   */
  get paginationConteneur$(): Observable<TablePagination> {
    return this._paginationConteneur.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ LIAISON REQUETE
  // -----------------------------------------------------------------------------------------------------

  get plomb$(): Observable<Plomb> {
    return this._plomb.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ CREATE REQUETE
  // -----------------------------------------------------------------------------------------------------

  create(data: Conteneur): Observable<Conteneur> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._conteneur.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  createPlomb(data: Plomb): Observable<Plomb> {
    return this.api._post(`${this.url}/plomb`, data).pipe(
      tap((response: any) => {
        this._plomb.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ UPDATE REQUETE
  // -----------------------------------------------------------------------------------------------------

  update(data: Conteneur): Observable<Conteneur> {
    return this.api._patch(`${this.url}/edit/${data?.id}`, data).pipe(
      tap((response: any) => {
        this._conteneur.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  updatePlomb(data: Plomb): Observable<Plomb> {
    return this.api._patch(`${this.url}/plomb/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._plomb.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ DELETE REQUETE
  // -----------------------------------------------------------------------------------------------------

  delete(id: string): Observable<any> {
    return this.api._delete(`${this.url}/softdelete/${id}`).pipe(
      tap((response: any) => {
        this._conteneurs.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  deletePlomb(id: string): Observable<any> {
    return this.api._delete(`${this.url}/plomb/${id}`).pipe(
      tap((response: any) => {
        this._plomb.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Conteneur> {
    if(environment.production) {
      return new Observable<Conteneur>(obs => {
        obs.next(this.datas.find(res => res?.id === id));
      });
    }
    return this.api._get(`${this.url}/${id}`).pipe(
      map((response: any) => response?.response.data),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get conteneur
   * @param offset
   * @param take
   * @param order
   */
  getConteneurs(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    conteneurs: Conteneur[];
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
          this._paginationConteneur.next(response?.response.meta);
          this._conteneurs.next(response?.response.data);
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
    conteneurs: Conteneur[];
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
          this._paginationConteneur.next(response?.response.meta);
          this._conteneurs.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getNoBillLanding(): Observable<Conteneur[]> {
    // if(environment.production) {
    //   return new Observable<Conteneur[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}/list/no-bill-of-lading`)
      .pipe(
        tap((response: any) => {
          this._conteneurs.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get all non executé
   */
  getNoExecuted(): Observable<Conteneur[]> {
    // if(environment.production) {
    //   return new Observable<Conteneur[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}/list/no-executed`)
      .pipe(
        tap((response: any) => {
          this._conteneurs.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get no stuffing
   */
  getNoStuffing(id: string): Observable<Conteneur[]> {
    // if(environment.production) {
    //   return new Observable<Conteneur[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}/list/no-stuffing/${id}`)
      .pipe(
        tap((response: any) => {
          this._conteneurs.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Conteneur[]> {
    if(environment.production) {
      return new Observable<Conteneur[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._conteneurs.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
