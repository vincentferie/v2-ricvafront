import { Setting } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.types';
import { FuseIndexedDbService } from '@kolab/fuse/src/public-api';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfigService } from '@kolab/fuse/src/lib/services/config';
import {
  AppConfig,
  Scheme,
  Theme,
  Themes,
} from '../../../core/config/app.config';
import { Layout } from '../../layout.types';
import { Globale } from '@kolab/fuse/src/lib/services/globale';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styles: [
    `
      settings {
        position: static;
        display: block;
        flex: none;
        width: auto;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit, OnDestroy {
  //@ts-ignore
  config: AppConfig;
  //@ts-ignore
  layout: Layout;
  //@ts-ignore
  scheme: 'dark' | 'light';
  //@ts-ignore
  theme: string;
  //@ts-ignore
  themes: Themes;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  setting: Setting = { scheme: `light`, layout: `classic`, lang: `fr`, status: `offligne` };

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _fuseConfigService: FuseConfigService,
    private _fuseIndexedDbService: FuseIndexedDbService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config: AppConfig) => {
        // Store the config
        this.config = config;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the layout on the config
   *
   * @param layout
   */
  setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this._router
      .navigate([], {
        queryParams: {
          layout: null,
        },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        // Set the config
        this._fuseConfigService.config = { layout };
        this._fuseIndexedDbService.setting$.subscribe((setting: Setting) => {
          this.setting = setting;
          this._fuseIndexedDbService.setting = { ...this.setting, layout: layout };
        });
      });
  }

  /**
   * Set the scheme on the config
   *
   * @param scheme
   */
  setScheme(scheme: Scheme): void {
    this._fuseConfigService.config = { scheme };
    this._fuseIndexedDbService.setting$.subscribe((setting: Setting) => {
      this.setting = setting;
      this._fuseIndexedDbService.setting = { ...this.setting, scheme: scheme };
    });
  }

  /**
   * Set the theme on the config
   *
   * @param theme
   */
  setTheme(theme: Theme): void {
    this._fuseConfigService.config = { theme };
  }
}
