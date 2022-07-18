import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { SiteAssigne } from './site-assigne.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SiteAssigneService {
  siteAssigne: SiteAssigne;
  private _siteAssigne: BehaviorSubject<SiteAssigne | null> =
    new BehaviorSubject(null);
  private _siteAssignes: BehaviorSubject<SiteAssigne[] | null> =
    new BehaviorSubject(null);
  private _paginationSiteAssigne: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  datas: SiteAssigne[] = [
    {
      id: "ea121c73-4118-46ee-bf00-2ba8fe322e4e",
      superviseur_id: "ea121c73-4118-46ee-bf00-2ba8fe322e5e",
      superviseur: {
        id: "ea121c73-4118-46ee-bf00-2ba8fe322e5e",
        nom: "Gnahoua",
        prenoms: "Anicet",
      },
      site_id: "57863e1a-d21e-4f0d-8efb-1ee7572e35e5",
      site: {
        id: "57863e1a-d21e-4f0d-8efb-1ee7572e35e5",
        libelle: "Sonat 2",
      },
      actif: true
    }
  ];

  //URL
  private url = 'site-assignment';

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setSiteAssigne(siteAssigne: SiteAssigne) {
    this.siteAssigne = siteAssigne;
  }

  getSiteAssigne(): SiteAssigne {
    return this.siteAssigne;
  }

  get siteAssigne$(): Observable<SiteAssigne> {
    return this._siteAssigne.asObservable();
  }

  get siteAssignes$(): Observable<SiteAssigne[]> {
    if(environment.production) {
      return new Observable<SiteAssigne[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this._siteAssignes.asObservable();
  }

  get paginationSiteAssigne$(): Observable<TablePagination> {
    return this._paginationSiteAssigne.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: SiteAssigne): Observable<SiteAssigne> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._siteAssigne.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: SiteAssigne): Observable<SiteAssigne> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._siteAssigne.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<SiteAssigne> {
    if(environment.production) {
      return new Observable<SiteAssigne>(obs => {
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
        this._siteAssignes.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get site assigne
   * @param offset
   * @param take
   * @param order
   */
  getSiteAssignes(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    siteAssignes: SiteAssigne[];
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
          this._paginationSiteAssigne.next(response?.response.meta);
          this._siteAssignes.next(response?.response.data);
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
    siteAssignes: SiteAssigne[];
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
          this._paginationSiteAssigne.next(response?.response.meta);
          this._siteAssignes.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<SiteAssigne[]> {
    if(environment.production) {
      return new Observable<SiteAssigne[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._siteAssignes.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
