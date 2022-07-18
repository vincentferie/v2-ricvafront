import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { PlanEmpotage } from './plan-empotage.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlanEmpotageService {
  planEmpotage: PlanEmpotage;
  private _planEmpotage: BehaviorSubject<PlanEmpotage | null> =
    new BehaviorSubject(null);
  private _planEmpotages: BehaviorSubject<PlanEmpotage[] | null> =
    new BehaviorSubject(null);
  private _paginationPlanEmpotage: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'potting-plan';

  datas: PlanEmpotage[] = [];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setPlanEmpotage(planEmpotage: PlanEmpotage) {
    this.planEmpotage = planEmpotage;
  }

  getPlanEmpotage(): PlanEmpotage {
    return this.planEmpotage;
  }

  /**
   * Getter for one plan d'empotage
   */
  get planEmpotage$(): Observable<PlanEmpotage> {
    return this._planEmpotage.asObservable();
  }

  /**
   * Getter for plan d'empotages
   */
  get planEmpotages$(): Observable<PlanEmpotage[]> {
    return this._planEmpotages.asObservable();
  }

  /**
   * Getter for pagination for planEmpotage cashew
   */
  get paginationPlanEmpotage$(): Observable<TablePagination> {
    return this._paginationPlanEmpotage.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: PlanEmpotage): Observable<PlanEmpotage> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._planEmpotage.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: PlanEmpotage): Observable<PlanEmpotage> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._planEmpotage.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<PlanEmpotage> {
    if(environment.production) {
      return new Observable<PlanEmpotage>(obs => {
        this._planEmpotage.next(this.datas.find(res => res.id === id));
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
        this._planEmpotages.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get planEmpotagePagination
   * @param offset
   * @param take
   * @param order
   */
  getPlanEmpotages(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    planEmpotages: PlanEmpotage[];
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
          this._paginationPlanEmpotage.next(response?.response.meta);
          this._planEmpotages.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
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
    planEmpotages: PlanEmpotage[];
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
          this._paginationPlanEmpotage.next(response?.response.meta);
          this._planEmpotages.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get planEmpotagePagination
   * @param offset
   * @param take
   * @param order
   * @param filter_id
   */
  getFilter(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc',
    filter_id: string = ''
  ): Observable<{
    pagination: TablePagination;
    planEmpotages: PlanEmpotage[];
  }> {
    return this.api
      ._get(`${this.url}/paginate`,
      {
        offset: offset,
        take: take,
        order,
        filter_id,
      })
      .pipe(
        tap((response: any) => {
          this._paginationPlanEmpotage.next(response?.response.meta);
          this._planEmpotages.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<PlanEmpotage[]> {
    if(environment.production) {
      return new Observable<PlanEmpotage[]>(obs => {
        obs.next(this.datas);
      });
    }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._planEmpotages.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

}
