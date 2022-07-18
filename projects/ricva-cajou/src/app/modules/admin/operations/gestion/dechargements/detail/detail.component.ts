import { EntrepotAssigne } from '@ricva-cajou/src/app/modules/admin/administration/operations/entrepot-assigne/entrepot-assigne.types';
import { Specificite } from '@ricva-cajou/src/app/modules/admin/administration/operations/specificite/specificite.types';
import { Entrepot } from '@ricva-cajou/src/app/modules/admin/administration/operations/entrepot/entrepot.types';
import { Exportateur } from './../../../../administration/operations/exportateur/exportateur.types';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Campagne } from '../../../../administration/operations/campagne/campagne.types';
import { Ville } from '../../../../administration/operations/ville/ville.types';
import { DechargementService } from '../dechargement.service';
import { Dechargement } from '../dechargement.types';
import { DateUtils } from '@ricva-cajou/src/app/core/utils/date-utils';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { Globale } from '@kolab/fuse/src/lib/services/globale';
import { environment } from '@ricva-cajou/src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  dechargement: Dechargement;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Déchargements', range: null },
    { label: 'Détail', range: 'last' },
  ];

  prerequisAdd: boolean = false;
  chargementAdd: boolean = false;
  fileAdd: boolean = false;

  prerequisForm: FormGroup;
  chargementForm: FormGroup;
  fileForm: FormGroup;

  campagnes: Campagne[] = [];
  provenances: Ville[] = [];
  exportateurs: Exportateur[] = [];
  entrepots: EntrepotAssigne[] = [];
  specificites: Specificite[] = [];
  stateChargement: any[] = [];

  env: string = environment.server;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _DechargementService: DechargementService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.dechargement = this._DechargementService.getDechargement();
    if(!this.dechargement) {
      this.toBack();
      return;
    }
    this._changeDetectorRef.markForCheck();
  }

  ngOnInit(): void {
    this.editForm();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ statut, provenances, campagnes, exportateurs, entrepots, specificites }) => {
      this.stateChargement = statut;
      this.campagnes = campagnes;
      this.provenances = provenances;
      this.exportateurs = exportateurs;
      this.entrepots = entrepots;
      this.specificites = specificites;
    });
  }

  editForm() {
    this.prerequisForm = this._formBuilder.group({
      id: [this.dechargement?.id, Validators.required],
      campagne_id: [this.dechargement?.campagne?.id, Validators.required],
      provenance_id: [this.dechargement?.provenance?.id, Validators.required],
      specificity_id: [this.dechargement?.specificite?.id, Validators.required],
      exportateur_id: [this.dechargement?.exportateur?.id, Validators.required],
      entrepot_id: [this.dechargement?.entrepot?.id, Validators.required],
      speculation_id: [Globale.speculation_id, Validators.required],
    });
    this.chargementForm = this._formBuilder.group({
      id: [this.dechargement?.id, Validators.required],
      num_fiche: [this.dechargement?.num_fiche, Validators.required],
      date_dechargement: [ DateUtils.fromJsonDate(this.dechargement?.date_dechargement), Validators.required],
      tracteur: [this.dechargement?.tracteur, Validators.required],
      remorque: [this.dechargement?.remorque, Validators.required],
      fournisseur: [this.dechargement?.fournisseur, Validators.required],
      contact_fournisseur: [this.dechargement?.contact_fournisseur, Validators.required],
      transporteur: [this.dechargement?.transporteur, Validators.required],
      statut: [this.dechargement?.statut, Validators.required],
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
      this.chargementForm.get('step2').get('date_dechargement').setValue(null);
      this._snackBar._warning("La date déchargement ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(current)), null);
    }
    return;
  }

  _prerequisAdd(value: string) {
    this.prerequisAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _chargementAdd(value: string) {
    this.chargementAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _fileAdd(value: string) {
    this.fileAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  // METHODE SUBMIT

  _submitPrerequis() {
    if(this.prerequisForm.valid) {
      const data = { ...this.prerequisForm.getRawValue(), ...this.chargementForm.getRawValue() };
      this._DechargementService.setDechargement({...data })
      this._DechargementService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._prerequisAdd('CANCEL');
            this.dechargement = this._DechargementService.getDechargement();
            this._changeDetectorRef.markForCheck();
          }
        }, (error: any) => {})
    }
  }

  _submitChargement() {
    if(this.chargementForm.valid) {
      const data = { ...this.prerequisForm.getRawValue(), ...this.chargementForm.getRawValue() };
      this._DechargementService.setDechargement({...data })
      this._DechargementService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._chargementAdd('CANCEL');
            this.dechargement = this._DechargementService.getDechargement();
            this._changeDetectorRef.markForCheck();
          }
        }, (error: any) => {})
    }
  }

  _submitFile() {
    if(this.fileForm.valid) {
      let data: any = new FormData();
      Object.keys(this.fileForm.getRawValue()).forEach(item => {
        data.append(item, this.fileForm.get(item).value);
      });
      this._DechargementService.setDechargement({...data })
      this._DechargementService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._fileAdd('CANCEL');
            this.dechargement = this._DechargementService.getDechargement();
            this._changeDetectorRef.markForCheck();
          }
        }, (error: any) => {})
    }
  }

  // METHODE DELETE

  _delete(Id: string) {
    if (Id === '') {
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }

    this._modalDelete().afterClosed().subscribe((value: any) => {
      if(value === 'confirmed') {
        this._DechargementService
        .delete(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this.toBack();
            return;
          }
        }, (error: any) => {})
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
    this.router.navigate(['/operations/gestion-lots/dechargements/list']);
  }

  get f(): any { return this.chargementForm.controls};
}
