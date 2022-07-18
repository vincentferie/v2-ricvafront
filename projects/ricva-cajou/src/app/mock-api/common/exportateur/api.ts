import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import { exportateursCashew as exportateursData } from './data';

@Injectable({
  providedIn: 'root',
})
export class ExportateursMockApi {
  // exportateur
  private _exportateurs: any[] = exportateursData;

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
      .onGet('api/common/exportateurs', 300)
      .reply(({ request }) => {
        // Get available queries
        const query = request.params.get('query');
        const sort = request.params.get('sort') || 'libelle';
        const order = request.params.get('order') || 'asc';
        const offset = parseInt(request.params.get('offset') ?? '1', 10);
        const take = parseInt(request.params.get('take') ?? '10', 10);

        // Clone the products
        let exportateurs: any[] | null = cloneDeep(this._exportateurs);

        // Sort the products
        if (
          sort === 'libelle'
        ) {
          exportateurs.sort((a, b) => {
            const fieldA = a[sort].toString().toUpperCase();
            const fieldB = b[sort].toString().toUpperCase();
            return order === 'asc'
              ? fieldA.localeCompare(fieldB)
              : fieldB.localeCompare(fieldA);
          });
        } else {
          exportateurs.sort((a, b) =>
            order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
          );
        }

        // If query exists...
        if (query) {
          // Filter the exportateurs
          exportateurs = exportateurs.filter(
            (contact) =>
              contact.libelle &&
              contact.libelle.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Paginate - Start
        const exportateursLength = exportateurs.length;

        // Calculate pagination details
        const begin = offset * take;
        const end = Math.min(take * (offset + 1), exportateursLength);
        const lastPage = Math.max(Math.ceil(exportateursLength / take), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested offset number is bigger than
        // the last possible offset number, return null for
        // products but also send the last possible offset so
        // the app can navigate to there
        if (offset > lastPage) {
          exportateurs = null;
          pagination = {
            lastPage,
          };
        } else {
          // Paginate the results by take
          exportateurs = exportateurs.slice(begin, end);

          // Prepare the pagination mock-api
          pagination = {
            totalItems: exportateursLength,
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
            exportateurs,
            pagination,
          },
        ];
      });
    // -----------------------------------------------------------------------------------------------------
    // @ Dechargements - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/common/exportateur')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the products
        const exportateurs = cloneDeep(this._exportateurs);

        // Find the product
        const exportateur = exportateurs.find((item) => item.id === id);

        // Return the response
        return [200, exportateur];
      });
  }
}
