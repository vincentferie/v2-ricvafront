import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export type FuseRealApiReplyCallback =
  | ((data: {
      request: HttpRequest<any>;
      result: HttpResponse<any>;
      urlParams: { [key: string]: string };
    }) => any | Observable<any>)
  | undefined;

export type FuseRealApiMethods =
  | 'get'
  | 'post'
  | 'patch'
  | 'delete'
  | 'put'
  | 'head'
  | 'jsonp'
  | 'options';
