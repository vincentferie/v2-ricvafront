import { Router } from '@angular/router';
import { AuthService } from '@ricva-cajou/src/app/core/auth/auth.service';
import { ExchangeService } from './../../../../../ricva-cajou/src/app/core/communication/exchange-component.service';
import {
  Observable,
  Subject,
  interval as observableInterval,
} from 'rxjs';
import { takeWhile, scan, tap } from 'rxjs/operators';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations';
import { Component, Input, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, QueryList, ElementRef, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { FuseConfirmationService } from '../../services';
import { FuseScrollbarDirective } from '../../directives';

@Component({
  selector: 'fuse-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class FuseTableComponent implements OnInit {
  @ViewChildren(FuseScrollbarDirective)
  private _fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>;

  @ViewChild('rowsZone') rowsZone: ElementRef;

  @Input() headers: any[] = [];
  @Input() datas: Observable<any[]>;
  @Input() action: boolean = false;
  @Input() signal: boolean = false;
  @Input() showPath: string = "";
  @Input() edit: boolean = false;
  @Input() delete: boolean = false;
  @Input() toTop: boolean = true;

  @Output() scrollTop = new EventEmitter<any>();

  flashMessage: 'success' | 'error' | null = null;
  isLoading: boolean = true;
  message: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    private router: Router,
    private _authService: AuthService,
    private messageService: ExchangeService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Iterate through the directives and update all of them
    this._fuseScrollbarDirectives.forEach((fuseScrollbarDirective) => {
      fuseScrollbarDirective.update();
    });

    // Init Scroll
    this.rowsZone.nativeElement.scrollIntoView();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle to details
   *
   * @param Id
   */
  toggleDetails(Id: any): void {
    // If the product is already selected...
    if (Id === '') {
      // Notify error occured
      this.showFlashMessage('error', '');
      return;
    }
    // Go to details pages
    const token = this._authService.accessToken
    this.messageService.emitData({ token: token, type: 'uuid', data: Id });
    this.router.navigate([this.showPath]);
  }

  /**
   * Toggle product signal
   *
   * @param Id
   */
  signalElement(Id: string): void {
    // If the product is already selected...
    if (Id === '') {
      // Notify error occured
      this.showFlashMessage('error', 'Cet élément a été déjà supprimer !');
      return;
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: 'Voulez-vous vraiment signaler l\'élément ?',
      message: 'ATTENTION ! Cette action peut être irréversible.',
      icon: { show: false },
      actions: {
        confirm: {
          show: true,
          label: 'Je signale',
          color: 'primary',
        },
        cancel: {
          show: true,
          label: 'Annuler',
        },
      },
      dismissible: true,
    })

    dialogRef.afterClosed().subscribe(value => {
      if(value === 'confirmed') {
        this.datas.subscribe(res => {
          const index = res.indexOf(Id);
          if (index > -1) {
            res.splice(index, 1); // array remove
          }
        })
      }
    });
  }

  /**
   * Toggle product details
   *
   * @param Id
   */
  removeElement(Id: string): void {
    // If the product is already selected...
    if (Id === '') {
      // Notify error occured
      this.showFlashMessage('error', 'Cet élément a été déjà supprimer !');
      return;
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: 'Voulez-vous vraiment supprimer l\'élément ?',
      message: 'ATTENTION ! Cette action peut être irréversible.',
      icon: { show: false },
      actions: {
        confirm: {
          show: true,
          label: 'Je confirme',
          color: 'warn',
        },
        cancel: {
          show: true,
          label: 'Annuler',
        },
      },
      dismissible: true,
    })

    dialogRef.afterClosed().subscribe(value => {
      if(value === 'confirmed') {
        this.datas.subscribe(res => {
          const index = res.indexOf(Id);
          if (index > -1) {
            res.splice(index, 1); // array remove
          }
        })
      }
    });
  }

  /**
   * Show flash message
   */
  showFlashMessage(type: 'success' | 'error', msg: string): void {
    // Show the message
    this.flashMessage = type;

    // Mark for check
    this._changeDetectorRef.markForCheck();

    // Hide it after 3 seconds
    setTimeout(() => {
      this.flashMessage = null;

      // Mark for check
      this._changeDetectorRef.markForCheck();
    }, 3000);

    this._fuseConfirmationService.open({
      title: type === 'error' ? 'ATTENTION' : 'SUCCES',
      message: msg,
      icon: {
        show: true,
        name: 'heroicons_outline:exclamation',
        color: type
      },
      actions: {
        confirm: { show: false },
        cancel: { show: false },
      },
      dismissible: true,
    })
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  trackKey(object: any) {
    let arr = [];
    for (const [key, value] of Object.entries(object)) {
      arr.push(key);
    }
    return arr;
  }

  // ScrollUp function
  scrollToTop() {
    const duration = 600;
    const interval = 5;
    const move = (this.rowsZone.nativeElement.scrollTop * interval) / duration;

    observableInterval(interval)
      .pipe(
        scan((acc, curr) => acc - move, this.rowsZone.nativeElement.scrollTop),
        tap((position) => (this.rowsZone.nativeElement.scrollTop = position)),
        takeWhile((val) => val > 0)
      )
      .subscribe();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
