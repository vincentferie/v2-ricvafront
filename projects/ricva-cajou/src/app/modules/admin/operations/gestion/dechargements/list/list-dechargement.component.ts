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
import { Dechargement } from '../dechargement.types';
import { DechargementService } from '../dechargement.service';
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


@Component({
  selector: 'app-list-dechargement',
  templateUrl: './list-dechargement.component.html',
  styleUrls: ['./list-dechargement.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class ListDechargementComponent implements OnInit {
  @ViewChildren(FuseScrollbarDirective)
  private _fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>;

  @ViewChild('rowsZone') rowsZone: ElementRef;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  formFieldHelpers: string[] = Globale.formFieldHelpers;

  search: FormControl = new FormControl();
  formFiltre: FormControl = new FormControl();
  isLoading: boolean = false;

  // Dechargements
  paginationDechargement: TablePagination;
  dechargements$: Observable<Dechargement[]>;
  dechargements: Dechargement[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  headers = [
    { value: 'fiche', label: 'N° Fiche', name: 'N° Fiche', class: ''},
    { value: 'speculation', label: 'Speculation', name: 'Speculation', class: 'hidden lg:block'},
    { value: 'superviseur', label: 'Superviseur', name: 'Superviseur', class: 'hidden lg:block w-30'},
    { value: 'entrepot', label: 'Entrepôt', name: 'Entrepôt', class: 'hidden lg:block'},
    { value: 'date', label: 'Date', name: 'Date', class: 'w-22'},
    { value: 'statut', label: 'Statut', name: 'Statut', class: ''},
    { value: 'certifier', label: 'Certifier', name: 'Certifier', class: ''},
  ];
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Déchargements', range: null },
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
    private _CampagneService: CampagneService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _DechargementService: DechargementService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    //Get the pagination for dechargement cashew
    this._DechargementService.paginationDechargement$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: TablePagination) => {
        // Update the pagination
        this.paginationDechargement = pagination;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the Dechargement
    this.dechargements$ = this._DechargementService.dechargements$;
    this.campagnes$ = this._CampagneService.campagnes$;

    // Subscribe to search input field value changes
    this.search.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._DechargementService.getFilter(
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
          return this._DechargementService.getFilter(
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
            return this._DechargementService.getFilter(
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
    if(this.dechargements.length > 0) {
      this.rowsZone.nativeElement.scrollIntoView();
    }
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ campagnes }) => {
      this.campagnes = campagnes;
      campagnes.filter((res: any) => {
        if((new Date(res.ouverture)).getFullYear() === (new Date()).getFullYear()) {
          this.formFiltre.setValue(res?.id);
          this._DechargementService
          .getFilter(0, 10, 'asc', '', this.formFiltre.value)
          .subscribe(res => {
            this.dechargements = res?.dechargements;

            this._changeDetectorRef.markForCheck();
          })
        }
      })
    });
  }

  _filter() {
    this._DechargementService
    .getFilter(0, 10, 'asc', '', this.formFiltre.value)
    .subscribe(res => {
      this.dechargements = res?.dechargements;

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
  toggleDetails(dechargement: Dechargement): void {
    // If the product is already selected...
    if (dechargement?.id === '') {
      // Notify error occured
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }
    // Go to details pages
    this._DechargementService.setDechargement(dechargement);
    this.router.navigate(['/operations/gestion-lots/dechargements/detail']);
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
        this._DechargementService
        .delete(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this.dechargements$.subscribe((res: any) => {
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
    this.dechargements$ = this._DechargementService.dechargements$;
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
