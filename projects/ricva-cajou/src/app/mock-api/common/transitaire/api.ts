import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import { transitairesCashew as transitairesData } from './data';

@Injectable({
  providedIn: 'root',
})
export class TransitairesMockApi {
  // transitaire
  private _transitaires: any[] = transitairesData;

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
      .onGet('api/common/transitaires', 300)
      .reply(({ request }) => {
        // Get available queries
        const query = request.params.get('query');
        const sort = request.params.get('sort') || 'raison_social';
        const order = request.params.get('order') || 'asc';
        const offset = parseInt(request.params.get('offset') ?? '1', 10);
        const take = parseInt(request.params.get('take') ?? '10', 10);

        // Clone the products
        let transitaires: any[] | null = cloneDeep(this._transitaires);

        // Sort the products
        if (
          sort === 'raison_social'
        ) {
          transitaires.sort((a, b) => {
            const fieldA = a[sort].toString().toUpperCase();
            const fieldB = b[sort].toString().toUpperCase();
            return order === 'asc'
              ? fieldA.localeCompare(fieldB)
              : fieldB.localeCompare(fieldA);
          });
        } else {
          transitaires.sort((a, b) =>
            order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
          );
        }

        // If query exists...
        if (query) {
          // Filter the transitaires
          transitaires = transitaires.filter(
            (contact) =>
              contact.raison_social &&
              contact.raison_social.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Paginate - Start
        const transitairesLength = transitaires.length;

        // Calculate pagination details
        const begin = offset * take;
        const end = Math.min(take * (offset + 1), transitairesLength);
        const lastPage = Math.max(Math.ceil(transitairesLength / take), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested offset number is bigger than
        // the last possible offset number, return null for
        // products but also send the last possible offset so
        // the app can navigate to there
        if (offset > lastPage) {
          transitaires = null;
          pagination = {
            lastPage,
          };
        } else {
          // Paginate the results by take
          transitaires = transitaires.slice(begin, end);

          // Prepare the pagination mock-api
          pagination = {
            totalItems: transitairesLength,
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
            transitaires,
            pagination,
          },
        ];
      });
    // -----------------------------------------------------------------------------------------------------
    // @ Dechargements - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/common/transitaire')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the products
        const transitaires = cloneDeep(this._transitaires);

        // Find the product
        const transitaire = transitaires.find((item) => item.id === id);

        // Return the response
        return [200, transitaire];
      });
  }
}
