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
import { Site } from '../site/site.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  site: Site;
  private _site: BehaviorSubject<Site | null> =
    new BehaviorSubject(null);
  private _sites: BehaviorSubject<Site[] | null> =
    new BehaviorSubject(null);
  private _paginationSite: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'site';

  datas: Site[] = [
    {
      "id": "0b4af8ee-7506-491c-aab8-b691be29cb6d",
      "ville_id": "055d2689-dbb2-4c4c-a779-f9671bb47d14",
      "libelle": "Palm Beach",
      "superficie": null,
      "coordonneex": null,
      "coordonneey": null,
      "entrepots": [],
      "ville": {}
    },
    {
      "id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
      "ville_id": "055d2689-dbb2-4c4c-a779-f9671bb47d14",
      "libelle": "Sonat",
      "superficie": null,
      "coordonneex": null,
      "coordonneey": null,
      "entrepots": [
        {
          "id": "96f038d5-2a9b-4f37-8566-c149cfd8c268",
          "site_id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
          "libelle": "Sonat 1",
          "superficie": null,
          "coordonneex": null,
          "coordonneey": null
        },
        {
          "id": "619f0d78-52e0-4ffb-b23c-8310c2ad7577",
          "site_id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
          "libelle": "Palm beach 7",
          "superficie": 1000,
          "coordonneex": 50000,
          "coordonneey": -50000.0005
        },
        {
            "id": "3f282f4b-8239-4f1e-9fca-80916346f064",
            "site_id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
            "libelle": "Diaouné & Frère 2",
            "superficie": 8,
            "coordonneex": 4,
            "coordonneey": 4
        },
        {
            "id": "2ef9902e-7191-4cb3-b871-9965e3df7470",
            "site_id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
            "libelle": "Diaouné & Frère 1",
            "superficie": 2,
            "coordonneex": 2,
            "coordonneey": 3
        },
        {
            "id": "57863e1a-d21e-4f0d-8efb-1ee7572e35e5",
            "site_id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
            "libelle": "Sonat",
            "superficie": 2,
            "coordonneex": 3,
            "coordonneey": -10
        }
      ],
      "ville": {}
    },
    {
      "id": "ab348d55-d418-40d4-9a78-21f5d5e3cd31",
      "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
      "libelle": "Bassam Perform ",
      "superficie": null,
      "coordonneex": null,
      "coordonneey": null,
      "entrepots": [
          {
              "id": "86f445ae-5753-4ae0-80e0-7b05bf566d2e",
              "site_id": "ab348d55-d418-40d4-9a78-21f5d5e3cd31",
              "libelle": "Bassam Perform 2",
              "superficie": null,
              "coordonneex": null,
              "coordonneey": null
          },
          {
              "id": "0a172151-03c3-40fb-ae2c-25d287bfd641",
              "site_id": "ab348d55-d418-40d4-9a78-21f5d5e3cd31",
              "libelle": "Palm beach 5",
              "superficie": 1000,
              "coordonneex": 50000,
              "coordonneey": 50000
          },
          {
              "id": "8079d931-ecec-45ee-85a4-2c1d4e38b5b0",
              "site_id": "ab348d55-d418-40d4-9a78-21f5d5e3cd31",
              "libelle": "Bassam Perform 6",
              "superficie": 1000,
              "coordonneex": 5003,
              "coordonneey": 50000
          },
          {
              "id": "833503c5-365d-4611-a3f4-3d437e37ef23",
              "site_id": "ab348d55-d418-40d4-9a78-21f5d5e3cd31",
              "libelle": "Mon entrepot",
              "superficie": 996,
              "coordonneex": 405558888,
              "coordonneey": -405558888
          }
      ],
      "ville": {}
    },
    {
      "id": "f456e2cb-60f1-4fc5-a75a-1a281f9ac1e2",
      "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
      "libelle": "Bassam Diaouné",
      "superficie": null,
      "coordonneex": null,
      "coordonneey": null,
      "entrepots": [
          {
            "id": "6474f0d9-04e6-48f6-b8e2-518a1575d15f",
            "site_id": "f456e2cb-60f1-4fc5-a75a-1a281f9ac1e2",
            "libelle": "Mon entrepot 3",
            "superficie": 7,
            "coordonneex": 3,
            "coordonneey": 3
          }
      ],
      "ville": {}
    },
    {
      "id": "f8700e1b-323a-4d2a-9313-a5b08896d074",
      "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
      "libelle": "Bassam Péage",
      "superficie": null,
      "coordonneex": null,
      "coordonneey": null,
      "entrepots": [
          {
              "id": "394a0245-b156-4b02-8280-4e82128c9647",
              "site_id": "f8700e1b-323a-4d2a-9313-a5b08896d074",
              "libelle": "Bassam Péage",
              "superficie": 3,
              "coordonneex": 3,
              "coordonneey": -7
          },
          {
              "id": "05679c13-5fb7-4c0b-bd32-7c3f842909a3",
              "site_id": "f8700e1b-323a-4d2a-9313-a5b08896d074",
              "libelle": "Mon entrepot 1",
              "superficie": 8,
              "coordonneex": 405558888,
              "coordonneey": 405558888
          }
      ],
      "ville": {}
    }
  ];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setSite(site: Site) {
    this.site = site;
  }

  getSite(): Site {
    return this.site;
  }

  /**
   * Getter for one site
   */

  get site$(): Observable<Site> {
    return this._site.asObservable();
  }

  /**
   * Getter for sites
   */

  get sites$(): Observable<Site[]> {
    if(environment.production) {
      return new Observable<Site[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this._sites.asObservable();
  }

  /**
   * Getter for pagination for site cashew
   */
  get paginationSite$(): Observable<TablePagination> {
    return this._paginationSite.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: Site): Observable<Site> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._site.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: Site): Observable<Site> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._site.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Site> {
    if(environment.production) {
      return new Observable<Site>(obs => {
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
        this._sites.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get site
   * @param offset
   * @param take
   * @param order
   */
  getSites(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    sites: Site[];
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
          this._paginationSite.next(response?.response.meta);
          this._sites.next(response?.response.data);
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
    sites: Site[];
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
          this._paginationSite.next(response?.response.meta);
          this._sites.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Site[]> {
    if(environment.production) {
      return new Observable<Site[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._sites.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
