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
import { FuseScrollbarDirective } from '@kolab/fuse/src/lib/directives/scrollbar/scrollbar.directive';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { Router } from '@angular/router';
import { TablePagination } from '@kolab/fuse/src/public-api';
import { Globale } from '@kolab/fuse/src/lib/services/globale';
import { SiteAssigne } from '../site-assigne.types';
import { SiteAssigneService } from '../site-assigne.service';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';

@Component({
  selector: 'app-list-site-assigne',
  templateUrl: './list-site-assigne.component.html',
  styleUrls: ['./list-site-assigne.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class ListSiteAssigneComponent implements OnInit {
  @ViewChildren(FuseScrollbarDirective)
  private _fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>;

  @ViewChild('rowsZone') rowsZone: ElementRef;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  formFieldHelpers: string[] = Globale.formFieldHelpers;

  search: FormControl = new FormControl();
  isLoading: boolean = false;

  // SiteAssignes
  paginationSiteAssigne: TablePagination;
  siteAssignes$: Observable<SiteAssigne[]>;
  siteAssignes: SiteAssigne[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  headers = [
    { value: 'site', label: 'Site', name: 'Site', class: 'w-50'},
    { value: 'superviseur', label: 'Superviseur', name: 'Superviseur', class: 'w-50 hidden lg:block'},
    { value: 'etat', label: 'Etat', name: 'Etat', class: 'w-30 hidden sm:block'}
  ];
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Historique des sites assignés', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _snackBar: FuseSnackBarService,
    private _SiteAssigneService: SiteAssigneService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    //Get the pagination for entrepot cashew
    this._SiteAssigneService.paginationSiteAssigne$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: TablePagination) => {
        // Update the pagination
        this.paginationSiteAssigne = pagination;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the SiteAssigne
    this.siteAssignes$ = this._SiteAssigneService.siteAssignes$;

    // Subscribe to search input field value changes
    this.search.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._SiteAssigneService.getQuery(0, 10, 'asc', query);
        }),
        map(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
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
        id: 'site',
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
            return this._SiteAssigneService.getSiteAssignes(
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
    if(this.siteAssignes.length > 0) {
      this.rowsZone.nativeElement.scrollIntoView();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  toggleCreation() {
    this.router.navigate(['/administration/operations/site/assigne/new']);
  }

  /**
   * Toggle to details
   *
   * @param Id
   */
   toggleDetails(siteAssigne: SiteAssigne): void {
    // If the product is already selected...
    if (siteAssigne?.id === '') {
      // Notify error occured
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }
    // Go to details pages
    this._SiteAssigneService.setSiteAssigne(siteAssigne);
    this.router.navigate(['/administration/operations/site/assigne/detail']);
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

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  refresh() {
    // Need to apply loader and interval time
    this.siteAssignes$ = this._SiteAssigneService.siteAssignes$;
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
}
