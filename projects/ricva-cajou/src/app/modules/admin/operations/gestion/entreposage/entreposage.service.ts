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
import { Analyse, Balance, Balayure, Cession, Entreposage, Transfert } from './entreposage.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntreposageService {
  entreposage: Entreposage;
  private _entreposage: BehaviorSubject<Entreposage | null> =
    new BehaviorSubject(null);
  private _entreposages: BehaviorSubject<Entreposage[] | null> =
    new BehaviorSubject(null);
  private _paginationEntreposage: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  // LIAISON
  analyse: Analyse;
  private _analyse: BehaviorSubject<Analyse | null> =
  new BehaviorSubject(null);
  transfert: Transfert;
  private _transfert: BehaviorSubject<Transfert | null> =
  new BehaviorSubject(null);
  cession: Cession;
  private _cession: BehaviorSubject<Cession | null> =
  new BehaviorSubject(null);
  balance: Balance;
  private _balance: BehaviorSubject<Balance | null> =
  new BehaviorSubject(null);
  balayure: Balayure;
  private _balayure: BehaviorSubject<Balayure | null> =
  new BehaviorSubject(null);

  //URL
  private url = 'lots';

  datas: Entreposage[] = [
    {
      "id": "69e411b5-a516-4513-b756-faf3e0da995b",
      "campagne_id": "78b83f02-81f3-4a2b-96f5-9d18ec275a6c",
      "site_id": "cbf2b543-d35c-43fa-b8a9-223e65f4cee3",
      "entrepot_id": "619f0d78-52e0-4ffb-b23c-8310c2ad7577",
      "exportateur_id": "0128b52a-900b-4d79-9da3-d9aa5c07b25f",
      "speculation_id": "9e59fc8a-db1b-405e-bf9d-b6fa2601d38c",
      "dechargement_id": "810fe4df-57e8-40cb-8cc6-196700d4ec7e",
      "specificity_id": "8b4d896c-fa1a-4967-9fc8-13d12ec31c43",
      "numero_ticket_pese": "2",
      "code_dechargement": "2022/PALM-BEACH7/PIBOR/00001",
      "numero_lot": "588",
      "sac_en_stock": 0,
      "premiere_pesee": 0,
      "deuxieme_pesee": 0,
      "reconditionne": 0,
      "tare_emballage_refraction": 66,
      "sacs_decharge": 4,
      "poids_net": 1000,
      "date_dechargement": "2022-06-23T00:00:00.000Z",
      "statut": 2,
      "validity": false,
      "file": {
          "id": "a46faade-5625-4b8b-bd10-0ff5afb26d45",
          "lot_id": "69e411b5-a516-4513-b756-faf3e0da995b",
          "filename": "1655958958181-DECLARATIONOPPOSITION-37a0750ca36657fbd8310.pdf",
          "path": "uploads/lots/1655958958181-DECLARATIONOPPOSITION-37a0750ca36657fbd8310.pdf",
          "aws_id": null
      },
      "dechargement": {
          "id": "810fe4df-57e8-40cb-8cc6-196700d4ec7e",
          "campagne_id": "78b83f02-81f3-4a2b-96f5-9d18ec275a6c",
          "provenance_id": "055d2689-dbb2-4c4c-a779-f9671bb47d14",
          "specificity_id": "8b4d896c-fa1a-4967-9fc8-13d12ec31c43",
          "exportateur_id": "0128b52a-900b-4d79-9da3-d9aa5c07b25f",
          "entrepot_id": "619f0d78-52e0-4ffb-b23c-8310c2ad7577",
          "speculation_id": "9e59fc8a-db1b-405e-bf9d-b6fa2601d38c",
          "num_fiche": "55800",
          "date_dechargement": "2022-06-20T00:00:00.000Z",
          "tracteur": "00",
          "remorque": "55ZZ00",
          "fournisseur": "Anicet",
          "contact_fournisseur": "8526260066",
          "transporteur": "Godi",
          "statut": 1,
          "validity": false
      },
      "analyses": null,
      "balayures": [],
      "transferts": [],
      "balances": [],
      "cession": null,
      "campagne": {
        "id": "78b83f02-81f3-4a2b-96f5-9d18ec275a6c",
        "libelle": "Campagne 2022",
        "ouverture": "2022-02-01T00:00:00.000Z",
        "fermeture": "2022-12-31T00:00:00.000Z"
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

  setEntreposage(entreposage: Entreposage) {
    this.entreposage = entreposage;
  }

  getEntreposage(): Entreposage {
    return this.entreposage;
  }

  setAnalyse(analyse: Analyse) {
    this.analyse = analyse;
  }

  getAnalyse(): Analyse {
    return this.analyse;
  }

  setCession(cession: Cession) {
    this.cession = cession;
  }

  getCession(): Cession {
    return this.cession;
  }

  setBalance(balance: Balance) {
    this.balance = balance;
  }

  getBalance(): Balance {
    return this.balance;
  }

  setBalayure(balayure: Balayure) {
    this.balayure = balayure;
  }

  getBalayure(): Balayure {
    return this.balayure;
  }

  setTransfert(transfert: Transfert) {
    this.transfert = transfert;
  }

  getTransfert(): Transfert {
    return this.transfert;
  }

  /**
   * Getter for one entreposage
   */
  get entreposage$(): Observable<Entreposage> {
    return this._entreposage.asObservable();
  }

  /**
   * Getter for entreposages
   */
  get entreposages$(): Observable<Entreposage[]> {
    if(environment.production) {
      return new Observable<Entreposage[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this._entreposages.asObservable();
  }

  /**
   * Getter for pagination for entreposage cashew
   */
  get paginationEntreposage$(): Observable<TablePagination> {
    return this._paginationEntreposage.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ LIAISON REQUETE
  // -----------------------------------------------------------------------------------------------------

  get analyse$(): Observable<Analyse> {
    return this._analyse.asObservable();
  }

  get transfert$(): Observable<Transfert> {
    return this._transfert.asObservable();
  }

  get cession$(): Observable<Cession> {
    return this._cession.asObservable();
  }

  get balance$(): Observable<Analyse> {
    return this._balance.asObservable();
  }

  get balayure$(): Observable<Balayure> {
    return this._balayure.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ CREATE REQUETE
  // -----------------------------------------------------------------------------------------------------

  create(data: Entreposage): Observable<Entreposage> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._entreposage.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  createAnalyse(data: Analyse): Observable<Analyse> {
    return this.api._post(`${this.url}/analize`, data).pipe(
      tap((response: any) => {
        this._analyse.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  createTransfert(data: Transfert): Observable<Transfert> {
    return this.api._post(`${this.url}/transfert`, data).pipe(
      tap((response: any) => {
        this._analyse.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  createCession(data: Cession): Observable<Cession> {
    return this.api._post(`${this.url}/cession`, data).pipe(
      tap((response: any) => {
        this._analyse.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  createBalance(data: Balance): Observable<Balance> {
    return this.api._post(`${this.url}/balance`, data).pipe(
      tap((response: any) => {
        this._analyse.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  createSweep(data: Balayure): Observable<Balayure> {
    return this.api._post(`${this.url}/sweep`, data).pipe(
      tap((response: any) => {
        this._analyse.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ UPDATE REQUETE
  // -----------------------------------------------------------------------------------------------------

  update(data: Entreposage): Observable<Entreposage> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._entreposage.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  updateAnalyse(data: Analyse): Observable<Analyse> {
    return this.api._patch(`${this.url}/analize/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._analyse.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  updateTransfert(data: Transfert): Observable<Transfert> {
    return this.api._patch(`${this.url}/transfert/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._transfert.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  updateCession(data: Cession): Observable<Cession> {
    return this.api._patch(`${this.url}/cession/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._cession.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  updateBalance(data: Balance): Observable<Balance> {
    return this.api._patch(`${this.url}/balance/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._balance.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  updateSweep(data: Balayure): Observable<Balayure> {
    return this.api._patch(`${this.url}/sweep/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._balayure.next(response?.response.data);
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
        this._entreposages.next(response?.response);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  deleteAnalyse(id: string): Observable<any> {
    return this.api._delete(`${this.url}/analize/${id}`).pipe(
      tap((response: any) => {
        this._analyse.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  deleteTransfert(id: string): Observable<any> {
    return this.api._delete(`${this.url}/transfert/${id}`).pipe(
      tap((response: any) => {
        this._transfert.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  deleteCession(id: string): Observable<any> {
    return this.api._delete(`${this.url}/cession/${id}`).pipe(
      tap((response: any) => {
        this._cession.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  deleteBalance(id: string): Observable<any> {
    return this.api._delete(`${this.url}/balance/${id}`).pipe(
      tap((response: any) => {
        this._balance.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  deleteBalayure(id: string): Observable<any> {
    return this.api._delete(`${this.url}/sweep/${id}`).pipe(
      tap((response: any) => {
        this._balayure.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get entreposage
   * @param offset
   * @param take
   * @param order
   */
  getEntreposages(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    entreposages: Entreposage[];
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
          this._paginationEntreposage.next(response?.response.meta);
          this._entreposages.next(response?.response.data);
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
   */
  getQuery(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc',
    query: string = '',
  ): Observable<{
    pagination: TablePagination;
    entreposages: Entreposage[];
  }> {
    return this.api
      ._get(`${this.url}/paginate`,
      {
        offset: offset,
        take: take,
        order,
        query,
      })
      .pipe(
        tap((response: any) => {
          this._paginationEntreposage.next(response?.response.meta);
          this._entreposages.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get entreposage
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
    entreposages: Entreposage[];
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
          this._paginationEntreposage.next(response?.response.meta);
          this._entreposages.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get no stuffing (uuid de l'entrepot)
   */
  getNoStuffing(id: string): Observable<Entreposage[]> {
    return this.api
      ._get(`${this.url}/list/no-stuffing/${id}`)
      .pipe(
        tap((response: any) => {
          this._entreposages.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  getSingle(id: string): Observable<Entreposage> {
    if(environment.production) {
      return new Observable<Entreposage>(obs => {
        obs.next(this.datas.find(res => res.id === id));
      });
    }
    return this.api._get(`${this.url}/${id}`).pipe(
      map((response: any) => response?.response.data),
      catchError((error: any) => throwError(error))
    );
  }
}
