import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { Entrepot } from '../../entrepot/entrepot.types';
import { Superviseur } from '../../superviseur/superviseur.types';
import { EntrepotAssigneService } from '../entrepot-assigne.service';
import { EntrepotAssigne } from '../entrepot-assigne.types';

@Component({
  selector: 'app-detail-entrepot-assigne',
  templateUrl: './detail-entrepot-assigne.component.html',
  styleUrls: ['./detail-entrepot-assigne.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class DetailEntrepotAssigneComponent implements OnInit {
  entrepotAssigne: EntrepotAssigne;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des entrepôts assignés', range: null },
    { label: 'Détails d\'un entrepôt assigné', range: 'last' },
  ];

  infoAdd: boolean = false;
  infoForm: FormGroup;
  entrepots: Entrepot[] = [];
  superviseurs: Superviseur[] = [];

  stateActif: any[] = [
    { label: 'ACTIVER', value: true},
    { label: 'INACTIF', value: false}
  ]

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _EntrepotAssigneService: EntrepotAssigneService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.entrepotAssigne = this._EntrepotAssigneService.getEntrepotAssigne();
    if(!this.entrepotAssigne) {
      this.toBack();
      return;
    }
  }

  ngOnInit(): void {
    this.editForm();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ entrepots, superviseurs }) => {
      this.superviseurs = superviseurs;
      this.entrepots = entrepots;
    })
  }

  editForm() {
    this.infoForm = this._formBuilder.group({
      id: [this.entrepotAssigne?.id, Validators.required],
      entrepot_id: [this.entrepotAssigne?.entrepot_id, Validators.required],
      superviseur_id: [this.entrepotAssigne?.superviseur_id, Validators.required],
      actif: [this.entrepotAssigne?.actif, Validators.required],
    });
  }

  _infoAdd(value: string) {
    this.infoAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  // METHODE SUBMIT

  _submitInfo() {
    if(this.infoForm.valid) {
      const data = this.infoForm.getRawValue();
      const entrepotAssigne = {
        ...data,
        entrepot: this.entrepots.find(res => res.id === data?.entrepot_id),
        superviseur: this.superviseurs.find(res => res.id === data?.superviseur_id)
      }
      this._EntrepotAssigneService.setEntrepotAssigne(entrepotAssigne);
      this._EntrepotAssigneService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.entrepotAssigne = this._EntrepotAssigneService.getEntrepotAssigne();
            this._infoAdd('CANCEL');
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
        this._EntrepotAssigneService
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
    this.router.navigate(['/administration/operations/entrepot/assigne/list']);
  }
}
