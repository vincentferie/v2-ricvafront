import { Observable, tap, map, BehaviorSubject, of } from 'rxjs';
import { FuseConfigService } from '@kolab/fuse/src/lib/services/config/config.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Injectable } from '@angular/core';
import { Setting, User } from './indexed-db.types';

@Injectable({
  providedIn: 'root',
})
export class FuseIndexedDbService {

  /**
   * Constructor
   */
  constructor(
    private _dbService: NgxIndexedDBService,
    private _fuseConfigService: FuseConfigService
  ) {
  }

  set setting(setting: Setting) {
    this.settingCount$.subscribe((count: number) => {
      //On verifie s'il y'a un enregistrement qui existe dans DB
      this.setObjectStores('setting', setting, count)
    });
  }

  get setting$(): Observable<Setting> {
    return this._dbService.getByKey('setting', 1);
  }

  get settingCount$(): Observable<number> {
    return this._dbService.count('setting');
  }

  set user(user: User) {
    this.userCount$.subscribe((count: number) => {
      //On verifie s'il y'a un enregistrement qui existe dans DB
      this.setObjectStores('user', user, count)
    });
  }

  get user$(): Observable<User> {
    return this._dbService.getByKey('user', 1);
  }

  get userCount$(): Observable<number> {
    return this._dbService.count('user');
  }

  deleteUser(): Observable<any> {
    return this._dbService.delete('user', 1);
  }

  clear(store: string): Observable<boolean> {
    return this._dbService.clear(store);
  }

  setObjectStores(store: string, data: any, count: number) {
    if (count === 0) {
      this._dbService.add(store, data).subscribe();
    } else if (count === 1) {
      this._dbService.update(store, data).subscribe();
    }
  }
}
