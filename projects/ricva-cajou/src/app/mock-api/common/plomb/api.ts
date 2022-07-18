import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import { plombsCashew as plombsData } from './data';

@Injectable({
  providedIn: 'root',
})
export class PlombsMockApi {
  // plomb
  private _plombs: any[] = plombsData;

  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Dechargements - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/common/plombs', 300)
      .reply(({ request }) => {
        // Get available queries
        const query = request.params.get('query');
        const sort = request.params.get('sort') || 'one';
        const order = request.params.get('order') || 'asc';
        const offset = parseInt(request.params.get('offset') ?? '1', 10);
        const take = parseInt(request.params.get('take') ?? '10', 10);

        // Clone the products
        let plombs: any[] | null = cloneDeep(this._plombs);

        // Sort the products
        if (
          sort === 'one' ||
          sort === 'two' ||
          sort === 'three'
        ) {
          plombs.sort((a, b) => {
            const fieldA = a[sort].toString().toUpperCase();
            const fieldB = b[sort].toString().toUpperCase();
            return order === 'asc'
              ? fieldA.localeCompare(fieldB)
              : fieldB.localeCompare(fieldA);
          });
        } else {
          plombs.sort((a, b) =>
            order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
          );
        }

        // If query exists...
        if (query) {
          // Filter the plombs
          plombs = plombs.filter(
            (contact) =>
              contact.one &&
              contact.one.value.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Paginate - Start
        const plombsLength = plombs.length;

        // Calculate pagination details
        const begin = offset * take;
        const end = Math.min(take * (offset + 1), plombsLength);
        const lastPage = Math.max(Math.ceil(plombsLength / take), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested offset number is bigger than
        // the last possible offset number, return null for
        // products but also send the last possible offset so
        // the app can navigate to there
        if (offset > lastPage) {
          plombs = null;
          pagination = {
            lastPage,
          };
        } else {
          // Paginate the results by take
          plombs = plombs.slice(begin, end);

          // Prepare the pagination mock-api
          pagination = {
            totalItems: plombsLength,
            itemsPerPage: take,
            currentPage: offset,
            lastPage: lastPage,
            startIndex: begin,
            endIndex: end - 1,
          };
        }

        // Return the response
        return [
          200,
          {
            plombs,
            pagination,
          },
        ];
      });
    // -----------------------------------------------------------------------------------------------------
    // @ Dechargements - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/common/plomb')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the products
        const plombs = cloneDeep(this._plombs);

        // Find the product
        const plomb = plombs.find((item) => item.id === id);

        // Return the response
        return [200, plomb];
      });
  }
}
