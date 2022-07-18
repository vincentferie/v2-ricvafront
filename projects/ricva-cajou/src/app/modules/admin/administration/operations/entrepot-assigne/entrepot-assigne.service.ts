import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { EntrepotAssigne } from './entrepot-assigne.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntrepotAssigneService {
  entrepotAssigne: EntrepotAssigne;
  private _entrepotAssigne: BehaviorSubject<EntrepotAssigne | null> =
    new BehaviorSubject(null);
  private _entrepotAssignes: BehaviorSubject<EntrepotAssigne[] | null> =
    new BehaviorSubject(null);
  private _paginationEntrepotAssigne: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  datas: EntrepotAssigne[] = [
    {
      id: "ea121c73-4118-46ee-bf00-2ba8fe322e4e",
      superviseur_id: "ea121c73-4118-46ee-bf00-2ba8fe322e5e",
      superviseur: {
        id: "ea121c73-4118-46ee-bf00-2ba8fe322e5e",
        nom: "Gnahoua",
        prenoms: "Anicet",
      },
      entrepot_id: "57863e1a-d21e-4f0d-8efb-1ee7572e35e5",
      entrepot: {
        id: "57863e1a-d21e-4f0d-8efb-1ee7572e35e5",
        libelle: "Sonat 2",
      },
      actif: true
    }
  ];

  //URL
  private url = 'entrepot-assignment';

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setEntrepotAssigne(entrepotAssigne: EntrepotAssigne) {
    this.entrepotAssigne = entrepotAssigne;
  }

  getEntrepotAssigne(): EntrepotAssigne {
    return this.entrepotAssigne;
  }

  get entrepotAssigne$(): Observable<EntrepotAssigne> {
    return this._entrepotAssigne.asObservable();
  }

  get entrepotAssignes$(): Observable<EntrepotAssigne[]> {
    // if(environment.production) {
    //   return new Observable<EntrepotAssigne[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this._entrepotAssignes.asObservable();
  }

  get paginationEntrepotAssigne$(): Observable<TablePagination> {
    return this._paginationEntrepotAssigne.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: EntrepotAssigne): Observable<EntrepotAssigne> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._entrepotAssigne.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: EntrepotAssigne): Observable<EntrepotAssigne> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._entrepotAssigne.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<EntrepotAssigne> {
    // if(environment.production) {
    //   return new Observable<EntrepotAssigne>(obs => {
    //     obs.next(this.datas.find(res => res.id === id));
    //   });
    // }
    return this.api._get(`${this.url}/${id}`).pipe(
      map((response: any) => response?.response.data),
      catchError((error: any) => throwError(error))
    );
  }

  delete(id: string): Observable<any> {
    return this.api._delete(`${this.url}/softdelete/${id}`).pipe(
      tap((response: any) => {
        this._entrepotAssignes.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get entrepot assigne
   * @param offset
   * @param take
   * @param order
   */
  getEntrepotAssignes(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    entrepotAssignes: EntrepotAssigne[];
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
          this._paginationEntrepotAssigne.next(response?.response.meta);
          this._entrepotAssignes.next(response?.response.data);
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
    entrepotAssignes: EntrepotAssigne[];
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
          this._paginationEntrepotAssigne.next(response?.response.meta);
          this._entrepotAssignes.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<EntrepotAssigne[]> {
    // if(environment.production) {
    //   return new Observable<EntrepotAssigne[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._entrepotAssignes.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
