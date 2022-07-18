import { Campagne } from '@ricva-cajou/src/app/modules/admin/administration/operations/campagne/campagne.types';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { errosForm, Globale } from '@kolab/fuse/src/lib/services/globale';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { Observable, Subject } from 'rxjs';
import { CampagneService } from '../../../administration/operations/campagne/campagne.service';
import { ConteneurService } from '../../exports/parking-list/conteneurs/conteneur.service';
import { Conteneur } from '../../exports/parking-list/conteneurs/conteneur.types';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { BillOfLandingService } from '../bill-of-landing.service';
import { AuthService } from '@ricva-cajou/src/app/core/auth/auth.service';
import { Ville } from '../../../administration/operations/ville/ville.types';

@Component({
  selector: 'app-creation-bill-of-landing',
  templateUrl: './creation-bill-of-landing.component.html',
  styleUrls: ['./creation-bill-of-landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreationBillOfLandingComponent implements OnInit {
  @ViewChild('stepper')
  stepper: MatStepper;
  verticalStepperForm: FormGroup;
  isEditable = true;
  matcher = new MyErrorStateMatcher();

  // Environnement Required
  campagnes$: Observable<Campagne[]>;
  conteneurs$: Observable<Conteneur[]>;

  campagnes: Campagne[] = [];
  provenances: Ville[] = [];
  conteneurs: Conteneur[] = [];
  conteneur: Conteneur;

  filterCampagne: any;
  campagne_id: string;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  stepOne = true;
  stepTwo = false;
  stepThree = false;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Exports', range: null },
    { label: 'Bill of landing', range: null },
    { label: 'Création', range: 'last' },
  ];

  errosForm = errosForm;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: FuseSnackBarService,
    private activatedRoute: ActivatedRoute,
    private _CampagneService: CampagneService,
    private _ConteneurService: ConteneurService,
    private _BillOfLandingService: BillOfLandingService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {
    this._loadData();
  }

  ngOnInit(): void {
    // Call observable
    this.conteneurs$ = this._ConteneurService.conteneurs$;
    this.campagnes$ = this._CampagneService.campagnes$;

    this.createForm();
  }

  ngAfterViewInit(): void {
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ campagnes, conteneurs }) => {
      this.campagnes = campagnes;
      this.filterCampagne = campagnes;
      this.conteneurs = conteneurs;
    });
  }

  createForm() {
    // Vertical stepper form
    this.verticalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        campagne_id: [null, Validators.required],
        numero_bl: [null, Validators.required],
        details: this._formBuilder.array(this._itemOptions())
      }),
      step2: this._formBuilder.group({
        numero_voyage: [null, Validators.required],
        destination: [null, Validators.required],
        provenance: [null, Validators.required],
        amateur: [null, Validators.required],
        nom_client: [null, Validators.required],
        adresse_client: [null, Validators.required],
        pays_client: [null, Validators.required],
        port_depart: [null, Validators.required],
        port_arrive: [null, Validators.required],
        date_embarquement: [null, Validators.required]
      }),
      step3: this._formBuilder.group({
        file: [null]
      })
    });
  }

  _onConteneur(opt: any) {
    this.conteneur = this.conteneurs.find(res => res.id === opt.value.conteneur_id);
    if(!this.conteneur?.plomb){
      this._fuseConfirmationService.open({
        title: 'Il n\'existe aucun plomb sur ce conteneur !',
        message: null,
        icon: { show: false },
        actions: {
          confirm: { show: false },
          cancel: { show: false },
        },
        dismissible: true,
      })
    }
    opt.controls.plomb.setValue(this.conteneur?.plomb?.pb_chiffre);
  }

  onSubmit() {
    let data: any = new FormData();
    Object.keys(this.f.step1.getRawValue()).forEach(item => {
      if(item === 'campagne_id') {
        data.append(item, this.campagne_id);
      } else if(item === 'details') {
        const tab = this.verticalStepperForm.get('step1').get(item).value;
        for (let prop in tab) {
          let ligne = tab[prop];
          data.append("details[conteneur_id][]", ligne.conteneur_id);
          data.append("details[gross_weight][]", ligne.gross_weight);
          data.append("details[measurement][]", ligne.measurement);
          data.append("details[nbr_sacs][]", ligne.nbr_sacs);
          data.append("details[tare][]", ligne.tare);
        }
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
      this._BillOfLandingService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this.router.navigate(['/operations/exports/bill-of-landing/list']);
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

  setValue(event: any) {
    this.campagne_id = event.option.id
  }

  onFileSelected(event: any) {
    const file = event.target?.files[0] ?? null;
    const type = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
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
    if(new Date(this.f.step2.value.date_embarquement) > new Date()) {
      this.verticalStepperForm.get('step2').get('date_embarquement').setValue(null);
      this._snackBar._warning("La date d'embarquement ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(new Date())), null);
    }
    return;
  }

  _filter(value: any): any {
    this.filterCampagne = this.campagnes?.filter(item => {
      return item.libelle.toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
  }

  _itemOptions(): FormGroup[]  {
    const arr: any[] = [];
    arr.push(
      this._formBuilder.group({
        key: [new Date()],
        conteneur_id: [null, [Validators.required]],
        plomb: [{value: null, disabled: true}],
        nbr_sacs: [0, [Validators.required, Validators.min(0)]],
        gross_weight: [0, [Validators.required, Validators.min(0)]],
        tare: [0, [Validators.required, Validators.min(0)]],
        measurement: [0, [Validators.required, Validators.min(0)]]
      })
    );

    return arr;
  }

  _addOption() {
    return this.detail.push(
      this._formBuilder.group({
        key: [new Date()],
        conteneur_id: [null, [Validators.required]],
        plomb: [{value: null, disabled: true}],
        nbr_sacs: [0, [Validators.required, Validators.min(0)]],
        gross_weight: [0, [Validators.required, Validators.min(0)]],
        tare: [0, [Validators.required, Validators.min(0)]],
        measurement: [0, [Validators.required, Validators.min(0)]]
      })
    );
  }

  _deleteOption(row: any) {
    const index = this.detail.controls.indexOf(row);
    this.detail.controls.splice(index, 1);
  }

  get f(): any { return this.verticalStepperForm.controls; }

  get detail() { return this.verticalStepperForm.get('step1').get('details') as FormArray; }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
