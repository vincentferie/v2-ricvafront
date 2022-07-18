import { environment } from '@ricva-cajou/src/environments/environment';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Execution } from './execution.types';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';

@Injectable({
  providedIn: 'root',
})
export class ExecutionService {
  execution: Execution;
  private _execution: BehaviorSubject<Execution | null> =
    new BehaviorSubject(null);
  private _executions: BehaviorSubject<Execution[] | null> =
    new BehaviorSubject(null);
  private _paginationExecution: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'potting-execution';

  datas: Execution[] = [];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setExecution(execution: Execution) {
    this.execution = execution;
  }

  getExecution(): Execution {
    return this.execution;
  }

  get execution$(): Observable<Execution> {
    return this._execution.asObservable();
  }

  get executions$(): Observable<Execution[]> {
    // if(environment.production) {
    //   return new Observable<Execution[]>(obs => {
    //     this._executions.next(this.datas);
    //   });
    // }
    return this._executions.asObservable();
  }

  get paginationExecution$(): Observable<TablePagination> {
    return this._paginationExecution.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: Execution): Observable<Execution> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._execution.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: Execution): Observable<Execution> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._execution.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Execution> {
    if(environment.production) {
      return new Observable<Execution>(obs => {
        this._execution.next(this.datas.find(res => res.id === id));
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
        this._executions.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get execution
   * @param offset
   * @param take
   * @param order
   */
  getExecutions(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    executions: Execution[];
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
          this._paginationExecution.next(response?.response.meta);
          this._executions.next(response?.response.data);
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
    executions: Execution[];
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
          this._paginationExecution.next(response?.response.meta);
          this._executions.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get execution
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
    executions: Execution[];
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
          this._paginationExecution.next(response?.response.meta);
          this._executions.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get execution existing
   * @param query
   * @param filter_id
   */
  getExisting(
    query: string = '',
    filter_id: string = ''
  ): Observable<Execution[]> {
    return this.api
      ._get(`${this.url}/existing`,
      {
        query,
        filter_id,
      })
      .pipe(
        tap((response: any) => {
          this._executions.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Execution[]> {
    // if(environment.production) {
    //   return new Observable<Execution[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._executions.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
