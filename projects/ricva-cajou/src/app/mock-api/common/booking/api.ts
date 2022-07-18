import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import { bookingsCashew as bookingsData } from './data';

@Injectable({
  providedIn: 'root',
})
export class BookingsMockApi {
  // booking
  private _bookings: any[] = bookingsData;

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
      .onGet('api/common/bookings', 300)
      .reply(({ request }) => {
        // Get available queries
        const query = request.params.get('query');
        const sort = request.params.get('sort') || 'one';
        const order = request.params.get('order') || 'asc';
        const offset = parseInt(request.params.get('offset') ?? '1', 10);
        const take = parseInt(request.params.get('take') ?? '10', 10);

        // Clone the products
        let bookings: any[] | null = cloneDeep(this._bookings);

        // Sort the products
        if (
          sort === 'one' ||
          sort === 'two' ||
          sort === 'three'
        ) {
          bookings.sort((a, b) => {
            const fieldA = a[sort].toString().toUpperCase();
            const fieldB = b[sort].toString().toUpperCase();
            return order === 'asc'
              ? fieldA.localeCompare(fieldB)
              : fieldB.localeCompare(fieldA);
          });
        } else {
          bookings.sort((a, b) =>
            order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
          );
        }

        // If query exists...
        if (query) {
          // Filter the bookings
          bookings = bookings.filter(
            (contact) =>
              contact.one &&
              contact.one.value.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Paginate - Start
        const bookingsLength = bookings.length;

        // Calculate pagination details
        const begin = offset * take;
        const end = Math.min(take * (offset + 1), bookingsLength);
        const lastPage = Math.max(Math.ceil(bookingsLength / take), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested offset number is bigger than
        // the last possible offset number, return null for
        // products but also send the last possible offset so
        // the app can navigate to there
        if (offset > lastPage) {
          bookings = null;
          pagination = {
            lastPage,
          };
        } else {
          // Paginate the results by take
          bookings = bookings.slice(begin, end);

          // Prepare the pagination mock-api
          pagination = {
            totalItems: bookingsLength,
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
            bookings,
            pagination,
          },
        ];
      });
    // -----------------------------------------------------------------------------------------------------
    // @ Dechargements - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/common/booking')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the products
        const bookings = cloneDeep(this._bookings);

        // Find the product
        const booking = bookings.find((item) => item.id === id);

        // Return the response
        return [200, booking];
      });
  }
}
