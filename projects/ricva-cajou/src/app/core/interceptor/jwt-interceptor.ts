import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token: string;

  constructor(
    private auth: AuthService
  ) {
    this.token = this.auth.accessToken;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
          "access-code": `CAPSIKANSA-#Sr/_EQ}E)f)Y[s`,
          "access-tenant": `849cb89c-a77b-4fe6-b8e9-5fc2f76f4c7c`
        }
      });
    }
    return next.handle(request);
  }
}
