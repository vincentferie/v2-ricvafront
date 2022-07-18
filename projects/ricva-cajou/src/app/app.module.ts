import { FuseIndexedDbModule } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.module';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ActivatedRouteSnapshot,
  ExtraOptions,
  PreloadAllModules,
  RouterModule,
  RouterStateSnapshot
} from '@angular/router';
import { FuseConfigModule } from '@kolab/fuse/src/lib/services/config/config.module';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '../@fuse';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routing';
import { appConfig } from './core/config/app.config';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { FuseMockApiModule } from '../@fuse/lib/mock-api/mock-api.module';
import { mockApiServices } from './mock-api';

// Add
import { FuseLoadingCustomModule } from '@kolab/fuse/src/public-api';
import { Globale } from '@kolab/fuse/src/lib/services/globale';
import { FusePermissionsModule } from '@kolab/fuse/src/lib/services/permissions/permissions.module';
import { FuseConnectivityModule } from '@kolab/fuse/src/lib/services/connectivity/connectivity.module';
import { environment } from '../environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptor/jwt-interceptor';
import { HandlerErrorInterceptor } from './core/interceptor/handler-error.interceptor';
import { FuseSnackBarModule } from '@kolab/fuse/src/lib/services/snackbar/snackbar.module';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
  onSameUrlNavigation: 'reload',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    // Fuse, FuseConfig & FuseMockAPI
    FuseModule,
    FuseConfigModule.forRoot(appConfig),
    FuseMockApiModule.forRoot(mockApiServices),

    // Core module of your application
    CoreModule,

    // Layout module of your application
    LayoutModule,

    // 3rd party modules that require global configuration via forRoot
    MarkdownModule.forRoot({}),
    FuseIndexedDbModule,
    FuseConnectivityModule,
    FusePermissionsModule,
    FuseSnackBarModule,
    MatSnackBarModule,
    FuseLoadingCustomModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HandlerErrorInterceptor, multi: true },
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
      {
        //URL courante en lieu et place de l'URL localstorage
        var appAcces = Globale.user?.appAccess[0] ?? null;
        if(appAcces !== null) {
          const originUrl = localStorage.getItem('originUrl')?.toString().replace(appAcces + environment.domain, environment.domain);
          if(originUrl) {
            // Remove the access token from the local storage
            localStorage.removeItem('token');//Remove
            Globale.user = {};
            window.location.href = originUrl;
          }
        }
      }
    }
  ]

})
export class AppModule {}
