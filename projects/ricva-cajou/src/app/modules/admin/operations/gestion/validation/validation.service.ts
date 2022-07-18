import { environment } from '@ricva-cajou/src/environments/environment';
import { ApiService } from './../../../../../core/utils/api.service';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { Validation } from './validation.types';
import { TablePagination } from '@kolab/fuse/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validation: Validation;
  private _validation: BehaviorSubject<Validation | null> =
    new BehaviorSubject(null);
  private _validations: BehaviorSubject<Validation[] | null> =
    new BehaviorSubject(null);
  private _paginationValidation: BehaviorSubject<TablePagination | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'lots-validation';

  datas: Validation[] = [];

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  setValidation(validation: Validation) {
    this.validation = validation;
  }

  getValidation(): Validation {
    return this.validation;
  }

  get validation$(): Observable<Validation> {
    return this._validation.asObservable();
  }

  get validations$(): Observable<Validation[]> {
    // if(environment.production) {
    //   return new Observable<Validation[]>(obs => {
    //     this._validations.next(this.datas);
    //   });
    // }
    return this._validations.asObservable();
  }

  get paginationValidation$(): Observable<TablePagination> {
    return this._paginationValidation.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  create(data: Validation): Observable<Validation> {
    return this.api._post(`${this.url}`, data).pipe(
      tap((response: any) => {
        this._validation.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  update(data: Validation): Observable<Validation> {
    return this.api._patch(`${this.url}/edit/${data.id}`, data).pipe(
      tap((response: any) => {
        this._validation.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  getSingle(id: string): Observable<Validation> {
    if(environment.production) {
      return new Observable<Validation>(obs => {
        this._validation.next(this.datas.find(res => res.id === id));
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
        this._validations.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ VALIDATE REQUETE
  // -----------------------------------------------------------------------------------------------------

  validate(data: Validation): Observable<Validation> {
    return this.api._patch(`${this.url}/validate`, data).pipe(
      tap((response: any) => {
        this._validation.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  validateLot(data: Validation): Observable<Validation> {
    return this.api._patch(`${this.url}/autorize/${data.id}`, data).pipe(
      tap((response: any) => {
        this._validation.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  validateDechargement(data: Validation): Observable<Validation> {
    return this.api._patch(`${this.url}/autorize/unloading/${data.dechargement_id}`, data).pipe(
      tap((response: any) => {
        this._validation.next(response?.response.data);
      }),
      map((response: any) => response?.response),
      catchError((error: any) => throwError(error))
    );
  }

  /**
   * Get validation
   * @param offset
   * @param take
   * @param order
   */
  getValidations(
    offset: number = 0,
    take: number = 10,
    order: 'asc' | 'desc' | '' = 'asc'
  ): Observable<{
    pagination: TablePagination;
    validations: Validation[];
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
          this._paginationValidation.next(response?.response.meta);
          this._validations.next(response?.response.data);
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
    validations: Validation[];
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
          this._paginationValidation.next(response?.response.meta);
          this._validations.next(response?.response.data);
        }),
        map((response: any) => response?.response.data)
      );
  }

  /**
   * Get validation
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
    validations: Validation[];
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
          this._paginationValidation.next(response?.response.meta);
          this._validations.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get all
   */
  getAll(): Observable<Validation[]> {
    // if(environment.production) {
    //   return new Observable<Validation[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api
      ._get(`${this.url}`)
      .pipe(
        tap((response: any) => {
          this._validations.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }
}
