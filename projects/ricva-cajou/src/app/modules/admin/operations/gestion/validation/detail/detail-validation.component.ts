import { Specificite } from '@ricva-cajou/src/app/modules/admin/administration/operations/specificite/specificite.types';
import { Entrepot } from '@ricva-cajou/src/app/modules/admin/administration/operations/entrepot/entrepot.types';
import { Exportateur } from './../../../../administration/operations/exportateur/exportateur.types';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campagne } from '../../../../administration/operations/campagne/campagne.types';
import { Ville } from '../../../../administration/operations/ville/ville.types';
import { ValidationService } from '../validation.service';
import { Validation } from '../validation.types';
import { DateUtils } from '@ricva-cajou/src/app/core/utils/date-utils';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { Globale } from '@kolab/fuse/src/lib/services/globale';
import { environment } from '@ricva-cajou/src/environments/environment';
import { EntreposageService } from '../../entreposage/entreposage.service';

@Component({
  selector: 'app-detail-validation',
  templateUrl: './detail-validation.component.html',
  styleUrls: ['./detail-validation.component.scss']
})
export class DetailValidationComponent implements OnInit {
  validation: Validation;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Déchargements', range: null },
    { label: 'Détail', range: 'last' },
  ];

  lotAdd: boolean = false;
  dechargementAdd: boolean = false;
  fileAdd: boolean = false;

  lotForm: FormGroup;
  dechargementForm: FormGroup;
  fileForm: FormGroup;

  campagnes: Campagne[] = [];
  provenances: Ville[] = [];
  exportateurs: Exportateur[] = [];
  entrepots: Entrepot[] = [];
  specificites: Specificite[] = [];
  stateChargement: any[] = [];

  env: string = environment.server;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ValidationService: ValidationService,
    private _EntreposageService: EntreposageService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.validation = this._ValidationService.getValidation();
    if(!this.validation) {
      this.toBack();
      return;
    }
    this._changeDetectorRef.markForCheck();
  }

  ngOnInit(): void {
    this.editForm();
  }

  editForm() {
    this.lotForm = this._formBuilder.group({
      id: [this.validation.id, Validators.required],
      numero_ticket_pese: [this.validation.numero_ticket_pese, Validators.required],
      code_dechargement: [this.validation.code_dechargement, Validators.required],
      numero_lot: [this.validation.numero_lot, Validators.required],
      sac_en_stock: [this.validation.sac_en_stock, Validators.required],
      premiere_pesee: [this.validation.premiere_pesee, Validators.required],
      deuxieme_pesee: [this.validation.deuxieme_pesee, Validators.required],
      reconditionne: [this.validation.reconditionne, Validators.required],
      tare_emballage_refraction: [this.validation.tare_emballage_refraction, Validators.required],
      sacs_decharge: [this.validation.sacs_decharge, Validators.required],
      poids_net: [this.validation.poids_net, Validators.required],
      date_dechargement: [DateUtils.fromJsonDate(this.validation.date_dechargement), Validators.required],
      statut: [this.validation.statut, Validators.required],
    });
    this.dechargementForm = this._formBuilder.group({
      id: [this.validation?.id, Validators.required],
      dechargement_id: [this.validation?.dechargement_id, Validators.required],
      num_fiche: [this.validation?.dechargement?.num_fiche, Validators.required],
      date_dechargement: [ DateUtils.fromJsonDate(this.validation?.dechargement?.date_dechargement), Validators.required],
      tracteur: [this.validation?.dechargement?.tracteur, Validators.required],
      remorque: [this.validation?.dechargement?.remorque, Validators.required],
      fournisseur: [this.validation?.dechargement?.fournisseur, Validators.required],
      contact_fournisseur: [this.validation?.dechargement?.contact_fournisseur, Validators.required],
      transporteur: [this.validation?.dechargement?.transporteur, Validators.required],
    });
    this.fileForm = this._formBuilder.group({
      file: [null]
    });
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
    this.fileForm.get('step3').get('file').setValue(file)
  }

  _onDate() {
    var current = new Date();
    var date = new Date(this.f.value.date_dechargement);
    if(date > current) {
      this.dechargementForm.get('step2').get('date_dechargement').setValue(null);
      this._snackBar._warning("La date déchargement ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(current)), null);
    }
    return;
  }

  _lotAdd(value: string) {
    this.lotAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _dechargementAdd(value: string) {
    this.dechargementAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  // METHODE SUBMIT

  _submitAutorize() {
    if(this.lotForm.valid) {
      const data = { lot_id: this.validation.id, dechargement_id: this.validation.dechargement_id };
      this._ValidationService.setValidation({...data })
      this._ValidationService
        .validate(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._lotAdd('CANCEL');
            this.validation = this._ValidationService.getValidation();
            this._changeDetectorRef.markForCheck();
            this.toBack();
            return;
          }
        }, (error: any) => {})
    }
  }

  _submitAutorizeLot() {
    if(this.lotForm.valid) {
      const data = { lot_id: this.validation.id, dechargement_id: this.validation.dechargement_id };
      const value = { ...this.validation, ...this.lotForm.getRawValue(), ...this.dechargementForm.getRawValue() };
      this._ValidationService.setValidation({...value});
      this._ValidationService
        .validateLot(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._lotAdd('CANCEL');
            this.validation = this._ValidationService.getValidation();
            this._changeDetectorRef.markForCheck();
          }
        }, (error: any) => {})
    }
  }

  _submitAutorizeDechargement() {
    if(this.dechargementForm.valid) {
      const data = { dechargement_id: this.validation.dechargement_id };
      const value = { ...this.validation, ...this.lotForm.getRawValue(), ...this.dechargementForm.getRawValue() };
      this._ValidationService.setValidation({...value});
      this._ValidationService
        .validateDechargement(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._dechargementAdd('CANCEL');
            this.validation = this._ValidationService.getValidation();
            this._changeDetectorRef.markForCheck();
          }
        }, (error: any) => {})
    }
  }

  // METHODE DELETE

  _validate() {
    const dialogRef = this._fuseConfirmationService.open({
      title: 'Voulez-vous vraiment valider ?',
      message: null,
      icon: { show: false },
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
        this._submitAutorize();
      }
    });
  }

  _modalDelete() {
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
    return dialogRef;
  }

  toBack(): void {
    this.router.navigate(['/operations/gestion-lots/validation/list']);
  }

  get f(): any { return this.dechargementForm.controls};

}
