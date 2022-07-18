import { EntrepotAssigne } from '@ricva-cajou/src/app/modules/admin/administration/operations/entrepot-assigne/entrepot-assigne.types';
import { Ville } from '@ricva-cajou/src/app/modules/admin/administration/operations/ville/ville.types';
import { Campagne } from '@ricva-cajou/src/app/modules/admin/administration/operations/campagne/campagne.types';
import { Specificite } from './../../../../administration/operations/specificite/specificite.types';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { errosForm, Globale } from '@kolab/fuse/src/lib/services/globale';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { Observable, Subject } from 'rxjs';
import { Exportateur } from '../../../../administration/operations/exportateur/exportateur.types';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { ActivatedRoute, Router } from '@angular/router';
import { DechargementService } from '../dechargement.service';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreationComponent implements OnInit, OnDestroy {
  @ViewChild('stepper')
  stepper: MatStepper;
  verticalStepperForm: FormGroup;
  isEditable = true;
  matcher = new MyErrorStateMatcher();

  // Environnement Required
  campagnes: Campagne[] = [];
  provenances: Ville[] = [];
  exportateurs: Exportateur[] = [];
  entrepots: EntrepotAssigne[] = [];
  specificites: Specificite[] = [];

  filterCampagne: any[] = [];
  filterProvenance: any[] = [];
  filterExportateur: any[] = [];
  filterEntrepot: any[] = [];

  campagne_id: string;
  provenance_id: string;
  exportateur_id: string;
  entrepot_id: string;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Déchargements', range: null },
    { label: 'Création', range: 'last' },
  ];

  stateChargement: any[] = [];

  errosForm = errosForm;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _DechargementService: DechargementService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this._loadData();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ statut, provenances, campagnes, exportateurs, entrepots, specificites }) => {
      this.stateChargement = statut;
      this.campagnes = campagnes;
      this.filterCampagne = campagnes;
      this.provenances = provenances;
      this.filterProvenance = provenances;
      this.exportateurs = exportateurs;
      this.filterExportateur = exportateurs;
      this.entrepots = entrepots;
      this.filterEntrepot = entrepots;
      this.specificites = specificites;
    });
  }

  setValue(event: any, champs: string) {
    if(champs === 'CAMPAGNE') {
      this.campagne_id = event.option.id
    } else if(champs === 'PROVENANCE') {
      this.provenance_id = event.option.id
    } else if(champs === 'EXPORTATEUR') {
      this.exportateur_id = event.option.id
    } else if(champs === 'ENTREPOT') {
      this.entrepot_id = event.option.id
    }
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
    var date = new Date(this.f.step2.value.date_dechargement);
    if(date > current) {
      this.verticalStepperForm.get('step2').get('date_dechargement').setValue(null);
      this._snackBar._warning("La date déchargement ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(current)), null);
    }
    return;
  }

  createForm() {
    // Vertical stepper form
    //Recuperer le uuid de speculation_id est auto depuis IndexedDB
    this.verticalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        campagne_id: [null, Validators.required],
        provenance_id: [null, Validators.required],
        specificity_id: [null, Validators.required],
        exportateur_id: [null, Validators.required],
        entrepot_id: [null, Validators.required],
        speculation_id: [Globale.speculation_id, Validators.required],
      }),
      step2: this._formBuilder.group({
        num_fiche: [null, Validators.required],
        date_dechargement: [null, Validators.required],
        tracteur: [null, Validators.required],
        remorque: [null, Validators.required],
        fournisseur: [null, Validators.required],
        contact_fournisseur: [null, Validators.required],
        transporteur: [null, Validators.required],
        statut: [null, Validators.required],
      }),
      step3: this._formBuilder.group({
        file: [null]
      }),
    });

    this.verticalStepperForm.get('step1').get('campagne_id').valueChanges.subscribe(res => {
      this._filter(res, 'CAMPAGNE');
    });
    this.verticalStepperForm.get('step1').get('provenance_id').valueChanges.subscribe(res => {
      this._filter(res, 'PROVENANCE');
    })
    this.verticalStepperForm.get('step1').get('exportateur_id').valueChanges.subscribe(res => {
      this._filter(res, 'EXPORTATEUR');
    })
    this.verticalStepperForm.get('step1').get('entrepot_id').valueChanges.subscribe(res => {
      this._filter(res, 'ENTREPOT');
    })
  }

  onSubmit() {
    let data: any = new FormData();
    Object.keys(this.f.step1.getRawValue()).forEach(item => {
      if(item === 'campagne_id') {
        data.append(item, this.campagne_id);
      } else if(item === 'provenance_id') {
        data.append(item, this.provenance_id);
      } else if(item === 'entrepot_id') {
        data.append(item, this.entrepot_id);
      } else if(item === 'exportateur_id') {
        data.append(item, this.exportateur_id);
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
      this._DechargementService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this.router.navigate(['/operations/gestion-lots/dechargements/list']);
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

  _filter(value: any, champs: string): any {
    if(champs === 'CAMPAGNE') {
      this.filterCampagne = this.campagnes?.filter(item => {
        return item?.libelle.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    } else if(champs === 'PROVENANCE') {
      this.filterProvenance = this.provenances?.filter(item => {
        return item?.libelle.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    } else if(champs === 'EXPORTATEUR') {
      this.filterExportateur = this.exportateurs?.filter(item => {
        return item?.raison.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    } else if(champs === 'ENTREPOT') {
      this.filterEntrepot = this.entrepots?.filter(item => {
        return item?.entrepot?.libelle.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    }
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
