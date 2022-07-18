import { User } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.types';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import { map} from 'rxjs/operators';
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '@authentification/src/environments/environment';
import { FuseIndexedDbService } from '@kolab/fuse/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tenant: any;
  code: any;
  user: User;

  constructor(
    private http: HttpClient = null,
    public router: Router,
    @Inject(DOCUMENT) private document: Document,
    private _fuseIndexedDbService: FuseIndexedDbService
  ) {
    this._fuseIndexedDbService.user$.subscribe(res => {
      this.user = res;
      this.tenant = res?.accesTenant;
      this.code = res?.accesCode;
    })
  }

  get token (): string {
    return localStorage.getItem('token');
  }

  setToken(res: any): void {
    if (res && res?.data) {
      const dataToken = res?.data.accessToken as any;
      localStorage.setItem('token', JSON.stringify(dataToken));
    }
  }

  removeDataToken() {
    localStorage.removeItem('token');
    return this.router.navigate(['/sign-in']);
  }

  login(data: any) {
    const headers = new HttpHeaders({
      "access-code": this.code,
      "access-tenant": this.tenant
    });
    return this.http.post(`${environment.server}/auth/signin`, data, {headers})
    .pipe(
      map((res: any) => {
        const data = res?.response?.data;
        const user = { ...this.user, accessToken: data?.accessToken, appAccess: data?.appAccess, refreshToken:data?.refreshToken };
        this._fuseIndexedDbService.setObjectStores('user', user, 1);
        return [res, user];
      })
    );
  }

  async refreshToken() {
    const token = this.token;
    const body = {token};
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    this.http.post(`${environment.server}/token/refresh`, body, {headers})
      .subscribe((res) => {
      }, (error) => {
    });
  }
}
