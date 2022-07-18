import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@kolab/fuse/src/lib/services/media-watcher';
import { NavigationService } from 'projects/ricva-cajou/src/app/core/navigation/navigation.service';
import { Navigation } from 'projects/ricva-cajou/src/app/core/navigation/navigation.types';
import {
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from 'projects/ricva-cajou/src/@fuse/components/navigation';

@Component({
  selector: 'classic-layout',
  templateUrl: './classic.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
  isScreenSmall: boolean;
  navigation: Navigation;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  applicationType = {
    cacao: 'cacao',
    cashew: 'cashew',
    rubber: 'rubber',
    karite: 'karite',
  };

  applicationName: string = this.applicationType.cashew;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navigationService: NavigationService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to navigation data
    this._navigationService.navigation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((navigation: Navigation) => {
        this.navigation = navigation;
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({ matchingAliases }) => {
        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
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
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
        name
      );

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

  toggleGreenButton(appName: string) {
    switch (appName) {
      case this.applicationType.cacao:
        this.applicationName = this.applicationType.cacao;
        break;
      case this.applicationType.cashew:
        this.applicationName = this.applicationType.cashew;
        break;
      case this.applicationType.rubber:
        this.applicationName = this.applicationType.rubber;
        break;
      case this.applicationType.karite:
        this.applicationName = this.applicationType.karite;
        break;
      default:
        this.applicationName = this.applicationType.cashew;
    }
  }
}
