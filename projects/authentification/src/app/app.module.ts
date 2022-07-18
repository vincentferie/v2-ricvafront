import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRouteSnapshot, ExtraOptions, PreloadAllModules, Router, RouterModule, RouterStateSnapshot } from '@angular/router';
import { FuseModule } from '../@fuse';
import { appRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { FuseConfigModule } from '@kolab/fuse/src/lib/services/config/config.module';
import { appConfig } from './core/config/app.config';
import { CoreModule } from './core/core.module';
import { MarkdownModule } from 'ngx-markdown';
import { FuseMockApiModule } from '../@fuse/lib/mock-api/mock-api.module';
import { mockApiServices } from './mock-api';
import { FuseIndexedDbModule } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.module';
import { FuseConnectivityModule } from '@kolab/fuse/src/lib/services/connectivity/connectivity.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FuseSnackBarModule } from '@kolab/fuse/src/lib/services/snackbar/snackbar.module';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),
    //Fuse Library
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
    FuseSnackBarModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
})
export class AppModule {}
