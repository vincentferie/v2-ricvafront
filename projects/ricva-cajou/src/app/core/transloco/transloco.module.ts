import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from './transloco.http-loader';
import { environment } from 'projects/ricva-cajou/src/environments/environment';
import { FuseIndexedDbService } from '@kolab/fuse/src/public-api';
import { Setting } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.types';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      // Provide the default Transloco configuration
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [
          {
            id: 'en',
            label: 'English',
          },
          // {
          //   id: 'tr',
          //   label: 'Turkish',
          // },
          {
            id: 'fr',
            label: 'French',
          },
        ],
        defaultLang: 'fr',
        fallbackLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    {
      // Provide the default Transloco loader
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader,
    },
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      deps: [TranslocoService, FuseIndexedDbService],
      useFactory:
        (translocoService: TranslocoService, _fuseIndexedDbService: FuseIndexedDbService): any =>
        (): Promise<Translation> => {
          var defaultLang = translocoService.getDefaultLang();
          _fuseIndexedDbService.setting$.subscribe((setting: Setting) => {
            defaultLang = setting?.lang;
            translocoService.setActiveLang(defaultLang);
          });
          return translocoService.load(defaultLang).toPromise();
        },
      multi: true,
    },
  ],
})
export class TranslocoCoreModule {}
