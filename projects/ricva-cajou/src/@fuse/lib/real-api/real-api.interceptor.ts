import { Inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { delay, Observable, of, switchMap, throwError } from 'rxjs';
import { FUSE_REAL_API_DEFAULT_DELAY } from './real-api.constants';
import { FuseRealApiService } from './real-api.service';

@Injectable({
  providedIn: 'root',
})
export class FuseRealApiInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(
    @Inject(FUSE_REAL_API_DEFAULT_DELAY) private _defaultDelay: number,
    private _fuseRealApiService: FuseRealApiService
  ) {}

  /**
   * Intercept
   *
   * @param request
   * @param next
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Try to get the request handler
    const { handler, urlParams } = this._fuseRealApiService.findHandler(
      request.method.toUpperCase(),
      request.url
    );

    // Pass through if the request handler does not exist
    if (!handler) {
      return next.handle(request);
    }

    // Set the intercepted request on the handler
    handler.request = request;

    // Set the url params on the handler
    handler.urlParams = urlParams;

    // Subscribe to the response function observable
    return handler.response.pipe(
      delay(handler.delay ?? this._defaultDelay ?? 0),
      switchMap((response) => {
        // If there is no response data,
        // throw an error response
        if (!response) {
          response = new HttpErrorResponse({
            error: 'NOT FOUND',
            status: 404,
            statusText: 'NOT FOUND',
          });

          return throwError(response);
        }

        // If the status code is in between 200 and 300,
          return of(response.result);
      })
    );
  }
}
