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
import { Entrepot } from '../entrepot/entrepot.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';

@Injectable({
  providedIn: 'root',
})
export class EntrepotService {
  entrepot: Entrepot;
  private _entrepot: BehaviorSubject<Entrepot | null> =
    new BehaviorSubject(null);
  private _entrepots: BehaviorSubject<Entrepot[] | null> =
    new BehaviorSubject(null);
  private _paginationEntrepot: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'warehouses';

  datas: Entrepot[] = [
    {
      "id": "57863e1a-d21e-4f0d-8efb-1ee7572e35e5",
      "site_id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
      "libelle": "Sonat 2",
      "superficie": null,
      "coordonneex": null,
      "coordonneey": null,
      "site": {
        "ville_id": "055d2689-dbb2-4c4c-a779-f9671bb47d14",
        "libelle": "Sonat",
        "superficie": null
      }
    },
    {
      "id": "2ef9902e-7191-4cb3-b871-9965e3df7470",
      "site_id": "f456e2cb-60f1-4fc5-a75a-1a281f9ac1e2",
      "libelle": "Diaouné & Frère 1",
      "superficie": null,
      "coordonneex": null,
      "coordonneey": null,
      "site": {
        "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
        "libelle": "Bassam Diaouné",
        "superficie": null
      }
    },
    {
      "id": "3f282f4b-8239-4f1e-9fca-80916346f064",
      "site_id": "f456e2cb-60f1-4fc5-a75a-1a281f9ac1e2",
      "libelle": "Diaouné & Frère 2",
      "superficie": null,
      "coordonneex": null,
      "coordonneey": null,
      "site": {
        "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
        "libelle": "Bassam Diaouné",
        "superficie": null
      }
    },
    {
      "id": "394a0245-b156-4b02-8280-4e82128c9647",
      "site_id": "f8700e1b-323a-4d2a-9313-a5b08896d074",
      "libelle": "Bassam Péage",
      "superficie": null,
      "coordonneex": null,
      "coordonneey": null,
      "site": {
        "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
        "libelle": "Bassam Péage",
        "superficie": null
      }
    },
    {
      "id": "833503c5-365d-4611-a3f4-3d437e37ef23",
      "site_id": "ab348d55-d418-40d4-9a78-21f5d5e3cd31",
      "libelle": "Mon entrepot",
      "superficie": 1000,
      "coordonneex": 405558888,
      "coordonneey": -405558888,
      "site": {
        "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
        "libelle": "Bassam Perform ",
        "superficie": null
      }
    },
    {
      "id": "05679c13-5fb7-4c0b-bd32-7c3f842909a3",
      "site_id": "f8700e1b-323a-4d2a-9313-a5b08896d074",
      "libelle": "Mon entrepot 1",
      "superficie": 12,
      "coordonneex": 405558888,
      "coordonneey": 405558888,
      "site": {
        "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
        "libelle": "Bassam Péage",
        "superficie": null
      }
    },
    {
      "id": "6474f0d9-04e6-48f6-b8e2-518a1575d15f",
      "site_id": "f456e2cb-60f1-4fc5-a75a-1a281f9ac1e2",
      "libelle": "Mon entrepot 3",
      "superficie": 0,
      "coordonneex": 0,
      "coordonneey": 0,
      "site": {
        "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
        "libelle": "Bassam Diaouné",
        "superficie": null
      }
    },
    {
      "id": "0a172151-03c3-40fb-ae2c-25d287bfd641",
      "site_id": "ab348d55-d418-40d4-9a78-21f5d5e3cd31",
      "libelle": "Palm beach 5",
      "superficie": 1000,
      "coordonneex": 50000,
      "coordonneey": 50000,
      "site": {
        "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
        "libelle": "Bassam Perform ",
        "superficie": null
      }
    },
    {
      "id": "619f0d78-52e0-4ffb-b23c-8310c2ad7577",
      "site_id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
      "libelle": "Palm beach 7",
      "superficie": 1000,
      "coordonneex": 50000,
      "coordonneey": -50000.0005,
      "site": {
        "ville_id": "055d2689-dbb2-4c4c-a779-f9671bb47d14",
        "libelle": "Sonat",
        "superficie": null
      }
    },
    {
      "id": "8079d931-ecec-45ee-85a4-2c1d4e38b5b0",
      "site_id": "ab348d55-d418-40d4-9a78-21f5d5e3cd31",
      "libelle": "Bassam Perform 6",
      "superficie": 1000,
      "coordonneex": 5003,
      "coordonneey": 50000,
      "site": {
        "ville_id": "759b26c9-c9fe-4d55-9906-d7c9b48b6800",
        "libelle": "Bassam Perform ",
        "superficie": null
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

  setEntrepot(entrepot: Entrepot) {
    this.entrepot = entrepot;
  }

  getEntrepot(): Entrepot {
    return this.entrepot;
  }

  /**
   * Getter for one entrepot
   */
  get entrepot$(): Observable<Entrepot> {
    return this._entrepot.asObservable();
  }

  /**
   * Getter for entrepots
   */
  get entrepots$(): Observable<Entrepot[]> {
    // if(environment.production) {
    //   return new Observable<Entrepot[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this._entrepots.asObservable();
  }

  /**
   * Getter for pagination for entrepot cashew
   */
  get paginationEntrepot$(): Observable<TablePagination> {
    return this._paginationEntrepot.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create entrepot
   */
  create(data: Entrepot): Observable<Entrepot> {
    return this.api
      ._post(`${this.url}`, data)
      .pipe(
        tap((response: any) => {
          this._entrepot.next(response?.response.data);
        }),
        map((response: any) => response?.response),
        catchError((error: any) => throwError(error))
      );
  }

  update(data: Entrepot): Observable<Entrepot> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._entrepot.next(response?.response.data);
      }),
      map((response: any) => response.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Entrepot> {
    return this.api._get(`${this.url}/${id}`).pipe(
      tap((response: any) => {
        this._entrepot.next(response.response.data);
      }),
      map((response: any) => response.response.data),
      catchError((error: any) => throwError(error))
    );
  }

  delete(id: string): Observable<any> {
    return this.api._delete(`${this.url}/softdelete/${id}`).pipe(
      tap((response: any) => {
        this._entrepot.next(response?.response?.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get entrepot
   * @param offset
   * @param take
   * @param order
   */
  getEntrepots(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    entrepots: Entrepot[];
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
          this._paginationEntrepot.next(response?.response.meta);
          this._entrepots.next(response?.response.data);
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
    entrepots: Entrepot[];
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
          this._paginationEntrepot.next(response?.response.meta);
          this._entrepots.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Entrepot[]> {
    // if(environment.production) {
    //   return new Observable<Entrepot[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._entrepots.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
