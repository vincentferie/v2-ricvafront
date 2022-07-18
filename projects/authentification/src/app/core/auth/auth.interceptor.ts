import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshInProgress$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = this.notIntercept(request) ? request : this.addAuthenticationToken(request);
    return next.handle(req).pipe(
      catchError(error => {
        switch (error.status) {
          case 401:
            this.logout();
            return throwError(error);
          default: return throwError(error);
        }
      })
    );
  }

  notIntercept(request: any) {
    return !this.authService.token || request.url.includes('auth');
  }

  isRefresh(request: any) {
    return request.url.includes('auth/refresh');
  }

  private runRequest(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.token ? next.handle(this.addAuthenticationToken(request)) : throwError(new Error('Unauthenticated'));
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    const dataToken = this.authService.token;
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${dataToken}`
      }
    });
  }

  private logout() {
    this.authService.removeDataToken();
    location.reload();
  }
}
