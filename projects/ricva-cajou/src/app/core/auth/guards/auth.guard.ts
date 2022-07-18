import { AuthUtils } from './../auth.utils';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Params,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { FuseConfigService, FuseIndexedDbService } from '@kolab/fuse/src/public-api';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { Decrypt, Globale } from '@kolab/fuse/src/lib/services/globale';
import { isEmpty } from 'lodash';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.types';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  user: User = {
    uuid: ``,
    nom: ``,
    prenoms: ``,
    rules: [],
    accessToken: ``,
    refreshToken: ``,
    email: ``,
    avatar: ``,
    status: ``,
    groupement: ``,
    accesTenant: ``,
    accesCode: ``,
    appAccess: [],
    clientInfo: ``,
  }

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _fuseConfigService: FuseConfigService,
    private _fuseIndexedDbService: FuseIndexedDbService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Can activate
   *
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let redirectUrl = state.url === '/sign-out' ? '/' : state.url;
    //Route params query
    const params = route.queryParams ?? null;
    if(params['envValue'] && params['specuId'] && params['specu']){
      const token = JSON.parse(Decrypt(params['envValue']));
      const specu = JSON.parse(Decrypt(params['specu']));
      const specuId = JSON.parse(Decrypt(params['specuId']));
      this._authService.accessToken = token;

      const helper = new JwtHelperService();
      //decode the token in order to recover the data
      const decode = helper.decodeToken(this._authService.accessToken);

      // //Save returns in the indexedDB
      this.user = {
        id: decode.data?.id,
        nom: decode.data?.nom,
        prenoms: decode.data?.prenoms,
        rules: [],
        accessToken: token,
        refreshToken: ``,
        email: ``,
        avatar: ``,
        status: ``,
        groupement: ``,
        accesTenant: ``,
        accesCode: ``,
        appAccess: [{id: specuId, url: specu}],
        clientInfo: ``
      }
      this._fuseIndexedDbService.user = { ...this.user};

      // Redirect to new url without envValue
      this._router.navigate([this.rewriteRooting(redirectUrl)]);
      return of(true);
    }
    return of(true);
  }

  /**
   * Can activate child
   *
   * @param childRoute
   * @param state
   */
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):| Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._authService.accessToken){
      // Redirect to new url without envValue
      return true;
    }
    return false;
  }

  /**
   * Can load
   *
   * @param route
   * @param segments
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check the authenticated status
   *
   * @param redirectURL
   * @private
   */
  private _check(redirectURL: string): Observable<boolean> {
    // Check the authentication status
    return this._authService.check().pipe(
      switchMap((authenticated) => {
        // If the user is not authenticated...
        if (!authenticated) {
          // Remove the access token from the local storage
          localStorage.removeItem('token');

          // Set the authenticated flag to false
          authenticated = false;
          // Redirect to the sign-in page
          this._router.navigate(['sign-out-redirect'], { queryParams: { redirectURL } });

          // Prevent the access
          return of(false);
        }
        // Allow the access
        return of(true);
      })
    );
  }

  private rewriteRooting(stateUrl: string){
    if(stateUrl.includes('?envValue')){
      return stateUrl.split('?')[0];
    }else{
      return stateUrl;
    }
  }

}
