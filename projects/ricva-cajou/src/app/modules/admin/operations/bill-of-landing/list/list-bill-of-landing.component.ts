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
import { BillOfLanding } from '../bill-of-landing.types';
import { BillOfLandingService } from '../bill-of-landing.service';
import { Globale } from '@kolab/fuse/src/lib/services/globale';
import { FuseConfirmationService, FuseScrollbarDirective, TablePagination } from '@kolab/fuse/src/public-api';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bill-of-landing',
  templateUrl: './list-bill-of-landing.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class ListBillOfLandingComponent implements OnInit {
  @ViewChildren(FuseScrollbarDirective)
  private _fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>;

  @ViewChild('rowsZone') rowsZone: ElementRef;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  formFieldHelpers: string[] = Globale.formFieldHelpers;

  search: FormControl = new FormControl();
  isLoading: boolean = false;

  // pagition billOfLanding
  // BillOfLandings
  paginationBillOfLanding: TablePagination;
  billOfLandings$: Observable<BillOfLanding[]>;
  billOfLandings: BillOfLanding[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  headers = [
    { value: 'numero', label: 'N° BL', name: 'Numéro BL', class: ''},
    { value: 'campagne', label: 'Campagne', name: 'Campagne', class: ''},
    { value: 'voyage', label: 'N° voyage', name: 'Numéro voyage', class: ''},
    { value: 'destination', label: 'Destination', name: 'Destination', class: 'hidden md:block'},
    { value: 'client', label: 'Client', name: 'Client', class: 'hidden md:block'},
    { value: 'adresse', label: 'Adresse client', name: 'Adresse client', class: 'hidden md:block'},
  ];
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Exports', range: null },
    { label: 'Bill of landing', range: null },
    { label: 'Historique', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _BillOfLandingService: BillOfLandingService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    //Get the pagination for dechargement cashew
    this._BillOfLandingService.paginationBillOfLanding$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: TablePagination) => {
        // Update the pagination
        this.paginationBillOfLanding = pagination;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the Dechargement
    this.billOfLandings$ = this._BillOfLandingService.billOfLandings$;

    // Subscribe to search input field value changes
    this.search.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._BillOfLandingService.getQuery(
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
        id: 'fiche',
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
            return this._BillOfLandingService.getBillOfLandings(
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
    if(this.billOfLandings?.length > 0) {
      this.rowsZone.nativeElement.scrollIntoView();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle to details
   *
   * @param Id
   */
  toggleDetails(billOfLanding: BillOfLanding): void {
    // If the product is already selected...
    if (billOfLanding?.id === '') {
      // Notify error occured
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }
    // Go to details pages
    this._BillOfLandingService.setBillOfLanding(billOfLanding)
    this.router.navigate(['/operations/exports/bill-of-landing/detail']);
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
        this._BillOfLandingService
        .delete(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this.billOfLandings$.subscribe((res: any) => {
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
    this.billOfLandings$ = this._BillOfLandingService.billOfLandings$;
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
