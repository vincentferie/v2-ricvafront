import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { EmitterService } from '@kolab/fuse/src/lib/services/emitter/emitter.service';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';

@Injectable()
export class HandlerErrorInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
    private emitter: EmitterService,
    private _snackBar: FuseSnackBarService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.emitter.loading();
    const method = request?.method;
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status >= 200 && event.status <= 202 && method !== 'GET') {
            let response = event.body.response;
            if (response?.state && this.emitter.isAllowToLoad) {
              this._snackBar._success(response?.message, null);
            }
          }
          this.emitter.stopLoading();
        }
      },
      (response: HttpResponseBase) => {
        this.emitter.stopLoading();
        this.emitter.allowLoading();
        if (response instanceof HttpErrorResponse) {
          switch (response.status) {
            case 200: {
              this._snackBar._success('Mon message success', null);
              break;
            }
            case 201: {
              this._snackBar._success('Mon message success', null);
              break;
            }
            case 400: {
              const errors = response.error;
              if (Array.isArray(errors.message)) {
                Object.keys(errors.message).map((key: any) => {
                  this._snackBar._warning(errors.message[key], null);
                });
              } else if (!Array.isArray(errors.message)) {
                this._snackBar._warning(errors?.message, null);
              }
              break;
            }
            case 401: {
              const errors = response.error;
              this._snackBar._warning(errors.message, null);
              break;
            }
            case 402: {
              const errors = response.error.errors;
              this._snackBar._warning('Mon message warning', null);
              break;
            }
            case 403: {
              this._snackBar._warning('Mon message warning', null);
              break;
            }
            case 404: {
              const errors = response.error.response;
              this._snackBar._warning(errors.message, null);
              break;
            }
            case 409: {
              const errors = response.error.response;
              this._snackBar._warning(errors.message, null);
              break;
            }
            case 422: {
              const errors = response.error;
              this._snackBar._warning(errors?.message, null);
              break;
            }
            case 500: {
              const errors = response.error.response;
              if (response.status === 500 && response.hasOwnProperty('statusText')) {
                this._snackBar._danger(errors?.message, null);
              }
              break;
            }
            case 502: {
              const errors = response.error.response;
              if (response.status === 502 && response.hasOwnProperty('statusText')) {
                this._snackBar._danger(errors?.message, null);
              }
              this.emitter.stopLoading();
              break;
            }
            default: {
              this._snackBar._danger('ERREUR : DEFAULT', null);
            }
          }
        }
      }, () => {
        this.emitter.stopLoading();
      })
    );
  }
}
