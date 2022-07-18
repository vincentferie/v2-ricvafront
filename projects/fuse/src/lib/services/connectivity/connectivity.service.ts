import { Setting } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.types';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FuseIndexedDbService } from './../indexed-db/indexed-db.service';
import { HttpConnectivity, InternetConnectivity } from 'ngx-connectivity';
import { FuseConfigService } from '@kolab/fuse/src/lib/services/config/config.service';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { FuseConfirmationService } from '../confirmation';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class FuseConnectivityService {
  internetSubscription: Subscription;
  setting: Setting;

  /**
   * Constructor
   */
  constructor(
    private dialogRef: MatDialog,
    private _fuseConfigService: FuseConfigService,
    public internetConnectivity: InternetConnectivity,
    public httpConnectivity: HttpConnectivity,
    public _fuseIndexedDbService: FuseIndexedDbService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _dbService: NgxIndexedDBService
  ) {
    this.getOffligne()
  }

  getOffligne(): void {
    this.internetSubscription = this.internetConnectivity.isOnline$.subscribe(
      d => {
        this._fuseIndexedDbService.settingCount$.subscribe((count: number) => {
          this._fuseIndexedDbService.setting$.subscribe((res: Setting) => {
            if(count === 1) {
              var status = navigator.onLine ? 'onligne' : 'offligne'
              var setting = {...res, status: status}
              this._fuseConfigService.config = setting;
              this._fuseIndexedDbService.setting = setting;
            }
          });
        });
        this._react(d)
    })
  }

  _internet() {
    this._fuseConfirmationService.open({
      title: 'Aucune connexion internet !',
      message: 'Nous vous basculons automatiquement en mode hors-ligne.',
      icon: {
        show: true,
        name: 'heroicons_outline:wifi',
        color: 'warning',
      },
      actions: {
        confirm: { show: false },
        cancel: { show: false },
      },
      dismissible: true,
    })
  }

  _react(etat: boolean) {
    if (!etat) {
      this._internet()
    } else {
      this.dialogRef.closeAll()
    }
  }
}
