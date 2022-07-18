import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import { specificitesCashew as specificitesData } from './data';

@Injectable({
  providedIn: 'root',
})
export class SpecificitesMockApi {
  // specificite
  private _specificites: any[] = specificitesData;

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
      .onGet('api/common/specificites', 300)
      .reply(({ request }) => {
        // Get available queries
        const query = request.params.get('query');
        const sort = request.params.get('sort') || 'libelle';
        const order = request.params.get('order') || 'asc';
        const offset = parseInt(request.params.get('offset') ?? '1', 10);
        const take = parseInt(request.params.get('take') ?? '10', 10);

        // Clone the products
        let specificites: any[] | null = cloneDeep(this._specificites);

        // Sort the products
        if (
          sort === 'libelle'
        ) {
          specificites.sort((a, b) => {
            const fieldA = a[sort].toString().toUpperCase();
            const fieldB = b[sort].toString().toUpperCase();
            return order === 'asc'
              ? fieldA.localeCompare(fieldB)
              : fieldB.localeCompare(fieldA);
          });
        } else {
          specificites.sort((a, b) =>
            order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
          );
        }

        // If query exists...
        if (query) {
          // Filter the specificites
          specificites = specificites.filter(
            (contact) =>
              contact.libelle &&
              contact.libelle.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Paginate - Start
        const specificitesLength = specificites.length;

        // Calculate pagination details
        const begin = offset * take;
        const end = Math.min(take * (offset + 1), specificitesLength);
        const lastPage = Math.max(Math.ceil(specificitesLength / take), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested offset number is bigger than
        // the last possible offset number, return null for
        // products but also send the last possible offset so
        // the app can navigate to there
        if (offset > lastPage) {
          specificites = null;
          pagination = {
            lastPage,
          };
        } else {
          // Paginate the results by take
          specificites = specificites.slice(begin, end);

          // Prepare the pagination mock-api
          pagination = {
            totalItems: specificitesLength,
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
            specificites,
            pagination,
          },
        ];
      });
    // -----------------------------------------------------------------------------------------------------
    // @ Dechargements - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/common/specificite')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the products
        const specificites = cloneDeep(this._specificites);

        // Find the product
        const specificite = specificites.find((item) => item.id === id);

        // Return the response
        return [200, specificite];
      });
  }
}
