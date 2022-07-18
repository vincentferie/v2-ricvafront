import { FuseIndexedDbService } from '@kolab/fuse/src/public-api';
import { FuseConfigService } from '@kolab/fuse/src/lib/services/config/config.service';
import { Component, OnInit } from '@angular/core';
import { Setting } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.types';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  setting: Setting = { scheme: `light`, layout: `classic`, lang: `fr`, status: `onligne` };

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseIndexedDbService: FuseIndexedDbService
  ) {
  }

  ngOnInit() {
    this._initSettingDB();
  }

  _initSettingDB() {
    this._fuseIndexedDbService.settingCount$.subscribe((count: number) => {
      this._fuseIndexedDbService.setting$.subscribe((res: Setting) => {
        var setting = count === 1 ? res : this.setting;
        this._fuseConfigService.config = setting;
        this._fuseIndexedDbService.setting = setting;
      });
    });
  }
}
