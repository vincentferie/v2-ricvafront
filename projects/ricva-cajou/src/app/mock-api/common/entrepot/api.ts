import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import { entrepotsCashew as entrepotsData } from './data';

@Injectable({
  providedIn: 'root',
})
export class EntrepotsMockApi {
  // entrepot
  private _entrepots: any[] = entrepotsData;

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
      .onGet('api/common/entrepots', 300)
      .reply(({ request }) => {
        // Get available queries
        const query = request.params.get('query');
        const sort = request.params.get('sort') || 'libelle';
        const order = request.params.get('order') || 'asc';
        const offset = parseInt(request.params.get('offset') ?? '1', 10);
        const take = parseInt(request.params.get('take') ?? '10', 10);

        // Clone the products
        let entrepots: any[] | null = cloneDeep(this._entrepots);

        // Sort the products
        if (
          sort === 'libelle'
        ) {
          entrepots.sort((a, b) => {
            const fieldA = a[sort].toString().toUpperCase();
            const fieldB = b[sort].toString().toUpperCase();
            return order === 'asc'
              ? fieldA.localeCompare(fieldB)
              : fieldB.localeCompare(fieldA);
          });
        } else {
          entrepots.sort((a, b) =>
            order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
          );
        }

        // If query exists...
        if (query) {
          // Filter the entrepots
          entrepots = entrepots.filter(
            (contact) =>
              contact.libelle &&
              contact.libelle.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Paginate - Start
        const entrepotsLength = entrepots.length;

        // Calculate pagination details
        const begin = offset * take;
        const end = Math.min(take * (offset + 1), entrepotsLength);
        const lastPage = Math.max(Math.ceil(entrepotsLength / take), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested offset number is bigger than
        // the last possible offset number, return null for
        // products but also send the last possible offset so
        // the app can navigate to there
        if (offset > lastPage) {
          entrepots = null;
          pagination = {
            lastPage,
          };
        } else {
          // Paginate the results by take
          entrepots = entrepots.slice(begin, end);

          // Prepare the pagination mock-api
          pagination = {
            totalItems: entrepotsLength,
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
            entrepots,
            pagination,
          },
        ];
      });
    // -----------------------------------------------------------------------------------------------------
    // @ Dechargements - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/common/entrepot')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the products
        const entrepots = cloneDeep(this._entrepots);

        // Find the product
        const entrepot = entrepots.find((item) => item.id === id);

        // Return the response
        return [200, entrepot];
      });
  }
}
