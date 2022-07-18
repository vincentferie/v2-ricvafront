import { FuseIndexedDbService } from '@kolab/fuse/src/public-api';
import { Component, OnInit } from '@angular/core';
import { User } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: User;

  /**
   * Constructor
   */
  constructor(
    private _fuseIndexedDbService: FuseIndexedDbService
  ) {
    // this._initUserDB();
  }

  ngOnInit() {
  }

  _initUserDB() {
    this._fuseIndexedDbService.userCount$.subscribe((count: number) => {
      if (count === 0) {
        var user = this.user;
        this._fuseIndexedDbService.user = user;
      }
    });
  }
}
