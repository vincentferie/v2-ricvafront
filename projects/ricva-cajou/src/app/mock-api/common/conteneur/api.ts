import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import { conteneursCashew as conteneursData } from './data';

@Injectable({
  providedIn: 'root',
})
export class ConteneursMockApi {
  // conteneur
  private _conteneurs: any[] = conteneursData;

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
      .onGet('api/common/conteneurs', 300)
      .reply(({ request }) => {
        // Get available queries
        const query = request.params.get('query');
        const sort = request.params.get('sort') || 'one';
        const order = request.params.get('order') || 'asc';
        const offset = parseInt(request.params.get('offset') ?? '1', 10);
        const take = parseInt(request.params.get('take') ?? '10', 10);

        // Clone the products
        let conteneurs: any[] | null = cloneDeep(this._conteneurs);

        // Sort the products
        if (
          sort === 'one' ||
          sort === 'two' ||
          sort === 'three'
        ) {
          conteneurs.sort((a, b) => {
            const fieldA = a[sort].toString().toUpperCase();
            const fieldB = b[sort].toString().toUpperCase();
            return order === 'asc'
              ? fieldA.localeCompare(fieldB)
              : fieldB.localeCompare(fieldA);
          });
        } else {
          conteneurs.sort((a, b) =>
            order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
          );
        }

        // If query exists...
        if (query) {
          // Filter the conteneurs
          conteneurs = conteneurs.filter(
            (contact) =>
              contact.one &&
              contact.one.value.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Paginate - Start
        const conteneursLength = conteneurs.length;

        // Calculate pagination details
        const begin = offset * take;
        const end = Math.min(take * (offset + 1), conteneursLength);
        const lastPage = Math.max(Math.ceil(conteneursLength / take), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested offset number is bigger than
        // the last possible offset number, return null for
        // products but also send the last possible offset so
        // the app can navigate to there
        if (offset > lastPage) {
          conteneurs = null;
          pagination = {
            lastPage,
          };
        } else {
          // Paginate the results by take
          conteneurs = conteneurs.slice(begin, end);

          // Prepare the pagination mock-api
          pagination = {
            totalItems: conteneursLength,
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
            conteneurs,
            pagination,
          },
        ];
      });
    // -----------------------------------------------------------------------------------------------------
    // @ Dechargements - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/common/conteneur')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the products
        const conteneurs = cloneDeep(this._conteneurs);

        // Find the product
        const conteneur = conteneurs.find((item) => item.id === id);

        // Return the response
        return [200, conteneur];
      });
  }
}
