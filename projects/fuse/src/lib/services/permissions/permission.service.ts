import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { FuseIndexedDbService } from '../indexed-db';
import { User } from '../indexed-db/indexed-db.types';

@Injectable({
  providedIn: 'root',
})
export class FusePermissionsService {

  /**
   * Constructor
   */
  constructor(
    private _fuseIndexedDbService: FuseIndexedDbService,
    public _ngxPermissionsService: NgxPermissionsService
  ) {
    this._loadPermissions()
  }

  _loadPermissions() {
    this._fuseIndexedDbService.userCount$.subscribe((count: number) => {
      this._fuseIndexedDbService.user$.subscribe((user: User) => {
        return () => this._ngxPermissionsService.loadPermissions(user.rules);
      });
    });
  }

}
