import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FUSE_REAL_API_DEFAULT_DELAY } from './real-api.constants';
import { FuseRealApiInterceptor } from './real-api.interceptor';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FuseRealApiInterceptor,
      multi: true,
    },
  ],
})
export class FuseRealApiModule {
  /**
   * FuseMockApi module default configuration.
   *
   * @param realApiServices - Array of services that register mock API handlers
   * @param config - Configuration options
   * @param config.delay - Default delay value in milliseconds to apply all responses
   */
  static forRoot(
    realApiServices: any[],
    config?: { delay?: number }
  ): ModuleWithProviders<FuseRealApiModule> {
    return {
      ngModule: FuseRealApiModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          deps: [...realApiServices],
          useFactory: () => (): any => null,
          multi: true,
        },
        {
          provide: FUSE_REAL_API_DEFAULT_DELAY,
          useValue: config?.delay ?? 0,
        },
      ],
    };
  }
}
