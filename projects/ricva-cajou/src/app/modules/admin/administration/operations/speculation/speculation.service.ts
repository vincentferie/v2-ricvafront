import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import {
  Speculation,
  SpeculationPagination,
} from '../speculation/speculation.types';

@Injectable({
  providedIn: 'root',
})
export class SpeculationService {
  private _speculation: BehaviorSubject<Speculation | null> =
    new BehaviorSubject(null);
  private _speculations: BehaviorSubject<Speculation[] | null> =
    new BehaviorSubject(null);
  private _paginationSpeculation: BehaviorSubject<SpeculationPagination | null> =
    new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------


  /**
   * Getter for one speculation
   */

  get speculation$(): Observable<Speculation> {
    return this._speculation.asObservable();
  }

  /**
   * Getter for speculations
   */

  get speculations$(): Observable<Speculation[]> {
    return this._speculations.asObservable();
  }

  /**
   * Getter for pagination for speculation cashew
   */
  get paginationSpeculation$(): Observable<SpeculationPagination> {
    return this._paginationSpeculation.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get speculation
   * @param offset
   * @param take
   * @param sort
   * @param order
   * @param query
   */
  getSpeculations(
    offset: number = 0,
    take: number = 10,
    sort: string = 'one',
    order: 'asc' | 'desc' | '' = 'asc',
    query: string = ''
  ): Observable<{
    pagination: SpeculationPagination;
    speculations: Speculation[];
  }> {
    return this._httpClient
      .get<{
        pagination: SpeculationPagination;
        speculations: Speculation[];
      }>('api/apps/speculations', {
        params: {
          offset: '' + offset,
          take: '' + take,
          sort,
          order,
          query,
        },
      })
      .pipe(
        tap((response) => {
          this._paginationSpeculation.next(response.pagination);
          this._speculations.next(response.speculations);
        }),
        map((response: any) => response)
      );
  }

  /**
   * Get speculation by id
   */
  getSpeculationById(id: string): Observable<Speculation> {
    return this._speculations.pipe(
      take(1),
      map((speculations) => {
        // Find the speculation
        const speculation = speculations?.find((item) => item.id === id) || null;

        // Update the speculation
        this._speculation.next(speculation);

        // Return the speculation
        return speculation;
      }),
      switchMap((speculation) => {
        if (!speculation) {
          return throwError(
            'Could not found speculation with id of ' + id + '!'
          );
        }

        return of(speculation);
      })
    );
  }
}
