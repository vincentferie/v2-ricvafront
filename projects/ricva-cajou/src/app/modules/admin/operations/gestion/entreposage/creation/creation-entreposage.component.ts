import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { debounceTime, map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { DechargementService } from '../../dechargements/dechargement.service';
import { Dechargement } from '../../dechargements/dechargement.types';
import { errosForm } from '@kolab/fuse/src/lib/services/globale';
import { EntreposageService } from '../entreposage.service';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Campagne } from '../../../../administration/operations/campagne/campagne.types';

@Component({
  selector: 'app-creation-entreposage',
  templateUrl: './creation-entreposage.component.html',
  styleUrls: ['./creation-entreposage.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreationEntreposageComponent implements OnInit {
  @ViewChild('stepper')
  stepper: MatStepper;
  verticalStepperForm: FormGroup;
  isEditable = true;
  matcher = new MyErrorStateMatcher();

  // Environnement Required
  dechargements: Dechargement[] = [];
  campagnes: Campagne[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  stepOne = true;
  stepTwo = false;
  stepThree = false;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Entreposage', range: null },
    { label: 'Création', range: 'last' },
  ];

  errosForm = errosForm;
  filterOptions: any;

  dechargement_id: string;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _EntreposageService: EntreposageService,
    private _DechargementService: DechargementService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this._loadData();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ campagnes }) => {
      this.campagnes = campagnes;
    });
  }

  setValue(event: any) {
    this.dechargement_id = event.option.id
  }

  onFileSelected(event: any) {
    const file = event.target?.files[0] ?? null;
    const type = ['application/pdf'];
    const maxSize = 2; //En méga
    if(type.indexOf(file?.type) === -1) {
      this._snackBar._warning("Ce format de fichier n'est pas pris en compte !", null);
      return;
    }
    if(file?.size/1024/1024 > maxSize) {
      this._snackBar._warning("Ce fichier a une taille supérieur à 2MB !", null);
      return;
    }
    this.verticalStepperForm.get('step3').get('file').setValue(file)
  }

  _onDate() {
    var current = new Date();
    var date = new Date(this.f.step1.value.date_dechargement);
    if(date > current) {
      this.verticalStepperForm.get('step1').get('date_dechargement').setValue(null);
      this._snackBar._warning("La date déchargement ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(current)), null);
    }
    return;
  }

  createForm() {
    // Vertical stepper form
    this.verticalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        campagne_id: [null, Validators.required],
        dechargement_id: [{value: null, disabled: true}, Validators.required],
        numero_lot: [null, Validators.required],
        date_dechargement: [null, Validators.required],
        numero_ticket_pese: [0, [Validators.required, Validators.min(0)]]
      }),
      step2: this._formBuilder.group({
        sac_en_stock: [0, [Validators.required, Validators.min(0)]],
        reconditionne: [0, [Validators.required, Validators.min(0)]],
        tare_emballage_refraction: [0, [Validators.required, Validators.min(0)]],
        poids_net: [6, [Validators.required, Validators.min(6), Validators.max(60)]],
        sacs_decharge: [0, [Validators.required, Validators.min(0)]],
        premiere_pesee: [0, [Validators.required, Validators.min(0)]],
        deuxieme_pesee: [0, [Validators.required, Validators.min(0)]],
      }),
      step3: this._formBuilder.group({
        file: [null],
      }),
    });

    this.verticalStepperForm.get('step1').get('dechargement_id').valueChanges.subscribe(res => {
      this._filter(res);
    })

    this.verticalStepperForm.get('step1').get('campagne_id').valueChanges
    .subscribe(query => {
      this._DechargementService.getUnused(query).subscribe(res => {
        this.dechargements = res;
        this.filterOptions = res;

        this.verticalStepperForm.get('step1').get('dechargement_id').enable();
        this._changeDetectorRef.markForCheck();
      });
    });
  }

  onSubmit() {
    const form = this.verticalStepperForm.getRawValue();
    let data: any = new FormData();
    Object.keys(this.f.step1.getRawValue()).forEach(item => {
      if(item === 'dechargement_id') {
        data.append(item, this.dechargement_id);
      } else {
        data.append(item, this.verticalStepperForm.get('step1').get(item).value);
      }
    });
    Object.keys(this.f.step2.getRawValue()).forEach(item => {
      data.append(item, this.verticalStepperForm.get('step2').get(item).value);
    });
    Object.keys(this.f.step3.getRawValue()).forEach(item => {
      data.append(item, this.verticalStepperForm.get('step3').get(item).value);
    });
    if(this.verticalStepperForm.valid) {
      this._EntreposageService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this._snackBar._success(res?.message, null);
          this.router.navigate(['/operations/gestion-lots/entreposage/list']);
        }
      }, (error: any) => {})
    }
  }

  confirmeSubmit() {
    const dialogRef = this._fuseConfirmationService.open({
      title: 'Voulez-vous enregistrer ?',
      message: null,
      icon: { show: false },
      actions: {
        confirm: {
          show: true,
          label: 'OUI',
          color: 'primary'
        },
        cancel: {
          show: true,
          label: 'NON',
        },
      },
      dismissible: true,
    })

    dialogRef.afterClosed().subscribe(value => {
      if(value === 'confirmed') {
        this.onSubmit();
      }
    });
  }

  _filter(value: any): any {
    this.filterOptions = this.dechargements?.filter(item => {
      return item?.num_fiche?.toLowerCase().indexOf(value?.toLowerCase()) > -1;
    })
  }

  get f(): any { return this.verticalStepperForm.controls; }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
