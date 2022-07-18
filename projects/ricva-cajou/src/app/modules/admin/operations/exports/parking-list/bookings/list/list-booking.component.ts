import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  map,
  merge,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  interval as observableInterval,
} from 'rxjs';
import { takeWhile, scan, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { Booking } from '../booking.types';
import { BookingService } from '../booking.service';
import { FuseConfirmationService, FuseScrollbarDirective, TablePagination } from '@kolab/fuse/src/public-api';
import { Globale } from '@kolab/fuse/src/lib/services/globale';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class ListBookingComponent implements OnInit {
  @ViewChildren(FuseScrollbarDirective)
  private _fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>;

  @ViewChild('rowsZone') rowsZone: ElementRef;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  formFieldHelpers: string[] = Globale.formFieldHelpers;

  search: FormControl = new FormControl();
  isLoading: boolean = false;

  // pagition booking
  // Bookings
  paginationBooking: TablePagination;
  bookings$: Observable<Booking[]>;
  bookings: Booking[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  headers = [
    { value: 'numero', label: 'N° réel', name: 'Numéro réel', class: 'w-40'},
    { value: 'change', label: 'N° change', name: 'Numéro change', class: 'w-40'},
  ];
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Exports', range: null },
    { label: 'Parking list', range: null },
    { label: 'Bookings', range: null },
    { label: 'Historique', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _snackBar: FuseSnackBarService,
    private _BookingService: BookingService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    //Get the pagination for dechargement cashew
    this._BookingService.paginationBooking$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: TablePagination) => {
        // Update the pagination
        this.paginationBooking = pagination;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the Dechargement
    this.bookings$ = this._BookingService.bookings$;

    // Subscribe to search input field value changes
    this.search.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._BookingService.getQuery(
            0,
            10,
            'asc',
            query
          );
        }),
        map(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    //  change the text in the label pagination
    this._paginator._intl.itemsPerPageLabel = 'Afficher';
    this._paginator._intl.previousPageLabel = 'Voir moins';
    this._paginator._intl.nextPageLabel = 'Voir plus';

    // Iterate through the directives and update all of them
    this._fuseScrollbarDirectives.forEach((fuseScrollbarDirective) => {
      fuseScrollbarDirective.update();
    });

    // refresh the table content
    this.refresh();

    // material table
    if (this._sort && this._paginator) {
      // Set the initial sort
      this._sort.sort({
        id: 'numero_reel',
        start: 'asc',
        disableClear: true,
      });

      // Mark for check
      this._changeDetectorRef.markForCheck();

      // If the user changes the sort order...
      this._sort.sortChange
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => {
          // Reset back to the first offset
          this._paginator.pageIndex = 0;
        });

      // Get products if sort or offset changes
      merge(this._sort.sortChange, this._paginator.page)
        .pipe(
          switchMap(() => {
            this.isLoading = true;
            return this._BookingService.getBookings(
              this._paginator.pageIndex,
              this._paginator.pageSize
            );
          }),
          map(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }

    // Init Scroll
    if(this.bookings?.length > 0) {
      this.rowsZone.nativeElement.scrollIntoView();
    }
  }

  /**
   * Get the form field helpers as string
   */
  getFormFieldHelpersAsString(): string {
    return this.formFieldHelpers.join(' ');
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle to details
   *
   * @param Id
   */
  toggleDetails(booking: Booking): void {
    // If the product is already selected...
    if (booking?.id === '') {
      // Notify error occured
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }
    // Go to details pages
    this._BookingService.setBooking(booking);
    this.router.navigate(['/operations/exports/parking-list/bookings/detail']);
  }

  /**
   * Toggle product details
   *
   * @param Id
   */
  removeElement(Id: string): void {
    // If the product is already selected...
    if (Id === '') {
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }

    const dialogRef = this._fuseConfirmationService.open({
      title: 'Voulez-vous vraiment terminer cette action ?',
      message: 'Cette action peut être irréversible.',
      icon: { show: true, color: 'warning' },
      actions: {
        confirm: {
          show: true,
          label: 'Confirmer',
          color: 'primary',
        },
        cancel: {
          show: true,
          label: 'Annuler',
        },
      },
      dismissible: true,
    })

    dialogRef.afterClosed().subscribe((value: any) => {
      if(value === 'confirmed') {
        this._BookingService
        .delete(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this.bookings$.subscribe((res: any) => {
              const index = res.indexOf(Id);
              if (index > -1) { res.splice(index, 1); }
            })
          }
        }, (error: any) => {})
      }
    });
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

  refresh() {
    // Need to apply loader and interval time
    this.bookings$ = this._BookingService.bookings$;
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
