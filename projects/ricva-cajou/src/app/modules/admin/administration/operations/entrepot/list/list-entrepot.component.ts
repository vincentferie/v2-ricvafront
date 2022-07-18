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
import { FuseConfirmationService, TablePagination } from '@kolab/fuse/src/public-api';
import { Globale } from '@kolab/fuse/src/lib/services/globale';
import { Entrepot } from '../entrepot.types';
import { EntrepotService } from '../entrepot.service';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';

@Component({
  selector: 'app-list-entrepot',
  templateUrl: './list-entrepot.component.html',
  styleUrls: ['./list-entrepot.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class ListEntrepotComponent implements OnInit {
  @ViewChildren(FuseScrollbarDirective)
  private _fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>;

  @ViewChild('rowsZone') rowsZone: ElementRef;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  formFieldHelpers: string[] = Globale.formFieldHelpers;

  search: FormControl = new FormControl();
  isLoading: boolean = false;

  // Entrepots
  paginationEntrepot: TablePagination;
  entrepots$: Observable<Entrepot[]>;
  entrepots: Entrepot[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  headers = [
    { value: 'libelle', label: 'Libellé', name: 'Libellé', class: 'w-60'},
    { value: 'superficie', label: 'Superficie', name: 'Superficie (M²)', class: 'w-30'},
    { value: 'ville', label: 'Ville', name: 'Ville', class: 'hidden lg:block w-60'},
  ];
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des entrepots', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _snackBar: FuseSnackBarService,
    private _EntrepotService: EntrepotService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService
  ) {}

  /**
   * On init
   */
  ngOnInit(): void {
    //Get the pagination for entrepot cashew
    this._EntrepotService.paginationEntrepot$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: TablePagination) => {
        // Update the pagination
        this.paginationEntrepot = pagination;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the Entrepot
    this.entrepots$ = this._EntrepotService.entrepots$;

    // Subscribe to search input field value changes
    this.search.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._EntrepotService.getQuery(
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
        id: 'libelle',
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
            return this._EntrepotService.getEntrepots(
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
    if(this.entrepots.length > 0) {
      this.rowsZone.nativeElement.scrollIntoView();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  toggleCreation() {
    this.router.navigate(['/administration/operations/entrepot/new']);
  }

  /**
   * Toggle to details
   *
   * @param Id
   */
  toggleDetails(entrepot: Entrepot): void {
    // If the product is already selected...
    if (entrepot?.id === '') {
      // Notify error occured
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }
    // Go to details pages
    this._EntrepotService.setEntrepot(entrepot);
    this.router.navigate(['/administration/operations/entrepot/detail']);
  }

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
        this._EntrepotService
        .delete(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this.entrepots$.subscribe((res: any) => {
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
    this.entrepots$ = this._EntrepotService.entrepots$;
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
