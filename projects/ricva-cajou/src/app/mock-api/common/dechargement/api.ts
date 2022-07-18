import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import { dechargementsCashew as dechargementsData } from './data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DechargementsMockApi {
  // dechargement
  private _dechargements: any[] = dechargementsData;

  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService, private _httpClient: HttpClient) {
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
      .onGet('api/common/dechargements', 300)
      .reply(({ request }) => {
        // Get available queries
        const query = request.params.get('query');
        const sort = 'campagne_id';
        const order = request.params.get('order') || 'asc';
        const offset = parseInt(request.params.get('offset') ?? '1', 10);
        const take = parseInt(request.params.get('take') ?? '10', 10);

        // Clone the products
        let dechargements: any[] | null = cloneDeep(this._dechargements);

        dechargements.sort((a, b) =>
          order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
        );

        // If query exists...
        if (query) {
          // Filter the dechargements
          dechargements = dechargements.filter(
            (contact) =>
              contact.num_fiche &&
              contact.num_fiche.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Paginate - Start
        const dechargementsLength = dechargements.length;

        // Calculate pagination details
        const begin = offset * take;
        const end = Math.min(take * (offset + 1), dechargementsLength);
        const lastPage = Math.max(Math.ceil(dechargementsLength / take), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested offset number is bigger than
        // the last possible offset number, return null for
        // products but also send the last possible offset so
        // the app can navigate to there
        if (offset > lastPage) {
          dechargements = null;
          pagination = {
            lastPage,
          };
        } else {
          // Paginate the results by take
          dechargements = dechargements.slice(begin, end);

          // Prepare the pagination mock-api
          pagination = {
            totalItems: dechargementsLength,
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
            dechargements,
            pagination,
          },
        ];
      });
    // -----------------------------------------------------------------------------------------------------
    // @ Dechargements - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/common/dechargement')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the products
        const dechargements = cloneDeep(this._dechargements);

        // Find the product
        const dechargement = dechargements.find((item) => item.id === id);

        // Return the response
        return [200, dechargement];
      });
  }
}
