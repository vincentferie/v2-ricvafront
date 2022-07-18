import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { EntrepotAssigne } from '@ricva-cajou/src/app/modules/admin/administration/operations/entrepot-assigne/entrepot-assigne.types';
import { Booking } from '../../bookings/booking.types';
import { ConteneurService } from '../conteneur.service';
import { Conteneur, Plomb } from '../conteneur.types';

@Component({
  selector: 'app-detail-conteneur',
  templateUrl: './detail-conteneur.component.html',
  styleUrls: ['./detail-conteneur.component.scss']
})
export class DetailConteneurComponent implements OnInit {
  conteneur: Conteneur;
  plomb: Plomb = null;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Exports', range: null },
    { label: 'Parking list', range: null },
    { label: 'Conteneurs', range: null },
    { label: 'Détail', range: 'last' },
  ];

  infoAdd: boolean = false;
  plombAdd: boolean = false;

  infoForm: FormGroup;
  plombForm: FormGroup;

  entrepots: EntrepotAssigne[] = [];
  bookings: Booking[] = [];

  stateType: any[] = [];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _ConteneurService: ConteneurService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.conteneur = this._ConteneurService.getConteneur();
    this.plomb = this.conteneur?.plomb;
    if(!this.conteneur) {
      this.toBack();
      return;
    }

    this._changeDetectorRef.markForCheck();
  }

  ngOnInit() {
    this.editForm();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ bookings, entrepots, types }) => {
      this.bookings = bookings;
      this.entrepots = entrepots;
      this.stateType = types;
    });
  }

  editForm() {
    this.infoForm = this._formBuilder.group({
      id: [this.conteneur?.id, Validators.required],
      booking_id: [this.conteneur?.booking_id, Validators.required],
      entrepot_id: [this.conteneur?.entrepot_id, Validators.required],
      numero: [this.conteneur?.numero, Validators.required],
      type_tc: [this.conteneur?.type_tc, Validators.required],
      capacite: [this.conteneur?.capacite, [Validators.required, Validators.min(0)]],
    });
    this.plombForm = this._formBuilder.group({
      conteneur_id: [this.conteneur?.id, Validators.required],
      pb_lettre: [this.plomb?.pb_lettre, Validators.required],
      pb_chiffre: [this.plomb?.pb_chiffre, Validators.required]
    });
  }

  _infoAdd(value: string) {
    this.infoAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _plombAdd(value: string) {
    this.plombAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  // METHODE SUBMIT

  _submitInfo() {
    if(this.infoForm.valid) {
      const data = this.infoForm.getRawValue();
      const conteneur = {
        ...data,
        booking: this.bookings.find(res => res?.id === data.booking_id),
        entrepot: this.entrepots.find(res => res?.entrepot_id === data.entrepot_id).entrepot
      };
      this._ConteneurService.setConteneur(conteneur);
      this._ConteneurService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.conteneur = this._ConteneurService.getConteneur();
            this._infoAdd('CANCEL');
            this._changeDetectorRef.markForCheck();
          }
        }, (error: any) => {})
    }
  }

  _submitPlomb(type: string) {
    if(type === 'ADD') {
      if(this.plombForm.valid) {
        const data = this.plombForm.getRawValue();
        this._ConteneurService
          .createPlomb(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.plomb = res.data;
              this._ConteneurService.setPlomb(this.plomb);
              this._plombAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    } else if(type === 'EDIT') {
      if(this.plombForm.valid) {
        const data = {...this.plombForm.getRawValue(), id: this.plomb.id};
        this._ConteneurService.setPlomb(data);
        this._ConteneurService
          .updatePlomb(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.plomb = this._ConteneurService.getPlomb();
              this._plombAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
            this._plombAdd('CANCEL');
          }, (error: any) => {})
      }
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
        this._ConteneurService
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

  _deletePlomb(Id: string) {
    if (Id === '') {
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }

    this._modalDelete().afterClosed().subscribe((value: any) => {
      if(value === 'confirmed') {
        this._ConteneurService
        .deletePlomb(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this._ConteneurService.setPlomb(null);
            this.plomb = this._ConteneurService.getPlomb();
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
    this.router.navigate(['/operations/exports/parking-list/conteneurs/list']);
  }

}
