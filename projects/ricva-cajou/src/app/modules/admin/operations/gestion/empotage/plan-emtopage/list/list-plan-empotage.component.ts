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
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Globale } from '@kolab/fuse/src/lib/services/globale';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { fuseAnimations, FuseConfirmationService, FuseScrollbarDirective, TablePagination } from '@kolab/fuse/src/public-api';
import { PlanEmpotageService } from '../plan-empotage.service';
import { PlanEmpotage } from '../plan-empotage.types';

@Component({
  selector: 'app-list-plan-empotage',
  templateUrl: './list-plan-empotage.component.html',
  styleUrls: ['./list-plan-empotage.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class ListPlanEmpotageComponent implements OnInit {
  @ViewChildren(FuseScrollbarDirective)
  private _fuseScrollbarDirectives: QueryList<FuseScrollbarDirective>;

  @ViewChild('rowsZone') rowsZone: ElementRef;

  @ViewChild(MatPaginator) private _paginator: MatPaginator;
  @ViewChild(MatSort) private _sort: MatSort;

  formFieldHelpers: string[] = Globale.formFieldHelpers;

  search: FormControl = new FormControl();
  isLoading: boolean = false;

  // pagition planEmpotage
  // PlanEmpotages
  paginationPlanEmpotage: TablePagination;
  planEmpotages$: Observable<PlanEmpotage[]>;
  planEmpotages: PlanEmpotage[];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  headers = [
    { value: 'premium', label: 'Premium', name: 'Premium', class: ''},
    { value: 'booking', label: 'Booking', name: 'Booking', class: ''},
    { value: 'qualite', label: 'Qualité', name: 'Qualité', class: 'hidden lg:block'},
    { value: 'decompte', label: 'Décompte', name: 'Décompte', class: 'hidden lg:block'},
    { value: 'transitaire', label: 'Transitaire', name: 'Transitaire', class: 'hidden sm:block'},
    { value: 'entrepot', label: 'Entrepôt', name: 'Entrepôt', class: 'hidden sm:block'},
    { value: 'status', label: 'Statut', name: 'Statut', class: 'hidden sm:block'},
  ];
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Empotage', range: null },
    { label: 'Plan d\'empotage', range: null },
    { label: 'Historique', range: 'last' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _PlanEmpotageService: PlanEmpotageService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    //Get the pagination for planEmpotage cashew
    this._PlanEmpotageService.paginationPlanEmpotage$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((pagination: TablePagination) => {
        // Update the pagination
        this.paginationPlanEmpotage = pagination;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the PlanEmpotage
    this.planEmpotages$ = this._PlanEmpotageService.planEmpotages$;

    // Subscribe to search input field value changes
    this.search.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        switchMap((query) => {
          this.isLoading = true;
          return this._PlanEmpotageService.getQuery(
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
        id: 'one',
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
            return this._PlanEmpotageService.getPlanEmpotages(
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
    if(this.planEmpotages.length > 0) {
      this.rowsZone.nativeElement.scrollIntoView();
    }
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ planEmpotages }) => {
      this.planEmpotages = planEmpotages;
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle to details
   *
   * @param Id
   */
  toggleDetails(planEmpotage: PlanEmpotage): void {
    // If the product is already selected...
    if (planEmpotage?.id === '') {
      // Notify error occured
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }
    // Go to details pages
    this._PlanEmpotageService.setPlanEmpotage(planEmpotage);
    this.router.navigate(['/operations/gestion-lots/empotage/plan-empotage/detail']);
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
        this._PlanEmpotageService
        .delete(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this.planEmpotages$.subscribe((res: any) => {
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
    this.planEmpotages$ = this._PlanEmpotageService.planEmpotages$;
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
