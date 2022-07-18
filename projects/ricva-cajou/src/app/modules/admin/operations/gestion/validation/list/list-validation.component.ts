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
import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorStateMatcher, TablePagination, FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { CampagneService } from '../../../../administration/operations/campagne/campagne.service';
import { Globale } from '@kolab/fuse/src/lib/services/globale';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { Campagne } from '../../../../administration/operations/campagne/campagne.types';
import { Validation } from '../validation.types';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-list-validation',
  templateUrl: './list-validation.component.html',
  styleUrls: ['./list-validation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class ListValidationComponent implements OnInit {
  @ViewChildren(FuseScrollbarDirective)
  private _fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>;

  @ViewChild('rowsZone') rowsZone: ElementRef;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  formFieldHelpers: string[] = Globale.formFieldHelpers;

  search: FormControl = new FormControl();
  formFiltre: FormControl = new FormControl();
  isLoading: boolean = false;

  // Validations
  paginationValidation: TablePagination;
  validations$: Observable<Validation[]>;
  validations: Validation[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  headers = [
    { value: 'numero', label: 'N° Lot', name: 'N° Lot', class: ''},
    { value: 'chargement', label: 'Chargement', name: 'Chargement', class: ''},
    { value: 'ticket', label: 'N° Pesée', name: 'Ticket de pesée', class: 'hidden sm:block'},
    { value: 'ville', label: 'Ville', name: 'Ville', class: 'hidden sm:block w-40'},
    { value: 'statut', label: 'Statut', name: 'Statut', class: 'w-30'},
    { value: 'certifier', label: 'Certifier', name: 'Certifier', class: 'w-30'},
  ];
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Validation de lots', range: null },
    { label: 'Historique', range: 'last' },
  ];

  matcher = new MyErrorStateMatcher();

  // Environnement Required
  campagnes$: Observable<Campagne[]>;
  campagnes: Campagne[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ValidationService: ValidationService
  ) {
    this._loadData();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    //Get the pagination for validation cashew
    this._ValidationService.paginationValidation$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: TablePagination) => {
        // Update the pagination
        this.paginationValidation = pagination;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the Validation
    this.validations$ = this._ValidationService.validations$;

    // Subscribe to search input field value changes
    this.search.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._ValidationService.getFilter(
            0,
            10,
            'asc',
            query,
            this.formFiltre.value
          );
        }),
        map(() => {
          this.isLoading = false;
        })
      )
      .subscribe();

    this.formFiltre.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((filter) => {
          this.isLoading = true;
          return this._ValidationService.getFilter(
            0,
            10,
            'asc',
            '',
            filter
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
            return this._ValidationService.getFilter(
              this._paginator.pageIndex,
              this._paginator.pageSize,
              'asc',
              '',
              this.formFiltre.value
            );
          }),
          map(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }

    // Init Scroll
    if(this.validations.length > 0) {
      this.rowsZone.nativeElement.scrollIntoView();
    }
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ campagnes }) => {
      this.campagnes = campagnes;
      campagnes.filter((res: any) => {
        if((new Date(res.ouverture)).getFullYear() === (new Date()).getFullYear()) {
          this.formFiltre.setValue(res?.id);
          this._ValidationService
          .getFilter(0, 10, 'asc', '', this.formFiltre.value)
          .subscribe(res => {
            this.validations = res?.validations;

            this._changeDetectorRef.markForCheck();
          })
        }
      })
    });
  }

  _filter() {
    this._ValidationService
    .getFilter(0, 10, 'asc', '', this.formFiltre.value)
    .subscribe(res => {
      this.validations = res?.validations;

      this._changeDetectorRef.markForCheck();
    })
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle to details
   *
   * @param Id
   */
  toggleDetails(validation: Validation): void {
    // If the product is already selected...
    if (validation?.id === '') {
      // Notify error occured
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }
    // Go to details pages
    this._ValidationService.setValidation(validation);
    this.router.navigate(['/operations/gestion-lots/validation/detail']);
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
    this.validations$ = this._ValidationService.validations$;
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
