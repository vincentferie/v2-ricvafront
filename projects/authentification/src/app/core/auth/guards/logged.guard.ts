import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.token) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    // const redirectUrl = route.queryParams.returnUrl || '/';
    const redirectUrl = route.queryParams['route'] || '/';
    this.router.navigate([redirectUrl]);
    return false;
  }
}
