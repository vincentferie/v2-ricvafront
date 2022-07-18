import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FuseConnectivityService } from './connectivity.service';
import { NgModule } from '@angular/core';
import { HttpConnectivity, HttpConnectivityInterceptor, InternetConnectivity } from 'ngx-connectivity';

@NgModule({
  imports: [],
  providers: [
    FuseConnectivityService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConnectivityInterceptor,
      multi: true
    },
    InternetConnectivity,
    HttpConnectivity
  ],
})
export class FuseConnectivityModule {
  /**
   * Constructor
   */
  constructor(private _fuseConnectivityService: FuseConnectivityService) {}
}
