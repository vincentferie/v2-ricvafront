import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FuseTableService {
  private _data: BehaviorSubject<any>;
  private _datas: BehaviorSubject<any[]>;
  private _paginationData: BehaviorSubject<any[]>;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for one data
   */

  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  /**
   * Getter for datas
   */

  get datas$(): Observable<any[]> {
    return this._datas.asObservable();
  }

  /**
   * Get dechargement
   * @param page
   * @param size
   * @param sort
   * @param order
   * @param search
   */
  getDatas(
    page: number = 0,
    size: number = 10,
    sort: string = 'name',
    order: 'asc' | 'desc' | '' = 'asc',
    search: string = ''
  ): Observable<{
    pagination: any;
    datas: any[];
  }> {
    return this._httpClient
      .get<{
        pagination: any;
        datas: any[];
      }>('api/common/dechargements', {
        params: {
          page: '' + page,
          size: '' + size,
          sort,
          order,
          search,
        },
      })
      .pipe(
        tap((response) => {
          this._paginationData.next(response.pagination);
          this._datas.next(response.datas);
        })
      );
  }
}
