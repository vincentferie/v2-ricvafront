import { Globale } from '@kolab/fuse/src/lib/services/globale';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../core/user/user.types';
import { UserService } from '../../../core/user/user.service';
import { AuthService } from '@ricva-cajou/src/app/core/auth/auth.service';
import { FuseIndexedDbService } from '@kolab/fuse/src/public-api';
import { environment } from '@ricva-cajou/src/environments/environment';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user',
})
export class UserComponent implements OnInit, OnDestroy {
  /* eslint-disable @typescript-eslint/naming-convention */
  static ngAcceptInputType_showAvatar: BooleanInput;
  /* eslint-enable @typescript-eslint/naming-convention */

  @Input() showAvatar: boolean = true;
  user: User = Globale.user;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseIndexedDbService: FuseIndexedDbService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to user changes
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
   * Update the user status
   *
   * @param status
   */
  updateUserStatus(status: string): void {
    // Return if user is not available
    if (!this.user) {
      return;
    }

    // this._fuseIndexedDbService.setting$.subscribe((setting: Setting) => {
    //   this._fuseConfigService.config = setting;
    //   this._fuseIndexedDbService.setting = setting;
    // });

    // Update the user
    this._userService
      .update({
        ...this.user,
        status,
      })
      .subscribe();
  }

  /**
   * Sign out
   */
  signOut(): void {

    //URL courante en lieu et place de l'URL localstorage
    var appAcces = Globale.user?.appAccess[0] ?? null;
    if(appAcces !== null) {
      const originUrl = localStorage.getItem('originUrl')?.toString().replace(appAcces + environment.domain, environment.domain);

      if(originUrl) {
        // Remove the access token from the local storage
        localStorage.removeItem('token');//Remove
        Globale.user = {};
        window.location.href = originUrl;
      }
    }

    this._authService.signOut()
    this._router.navigate(['/sign-out-redirect']);
  }
}
