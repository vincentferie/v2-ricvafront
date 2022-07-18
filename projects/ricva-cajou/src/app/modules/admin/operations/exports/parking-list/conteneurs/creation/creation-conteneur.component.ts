import { EntrepotAssigne } from '@ricva-cajou/src/app/modules/admin/administration/operations/entrepot-assigne/entrepot-assigne.types';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { errosForm } from '@kolab/fuse/src/lib/services/globale';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { Entrepot } from '@ricva-cajou/src/app/modules/admin/administration/operations/entrepot/entrepot.types';
import { Observable, Subject } from 'rxjs';
import { Booking } from '../../bookings/booking.types';
import { ConteneurService } from '../conteneur.service';

@Component({
  selector: 'app-creation-conteneur',
  templateUrl: './creation-conteneur.component.html',
  styleUrls: ['./creation-conteneur.component.scss']
})
export class CreationConteneurComponent implements OnInit {
  form: FormGroup;
  isEditable = true;
  matcher = new MyErrorStateMatcher();

  // Environnement Required
  bookings$: Observable<Booking[]>;
  bookings: Booking[] = [];
  entrepots: EntrepotAssigne[] = [];

  booking_id: string;
  entrepot_id: string;

  filterBooking: any;
  filterEntrepot: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Exports', range: null },
    { label: 'Parking list', range: null },
    { label: 'Conteneurs', range: null },
    { label: 'Création', range: 'last' },
  ];

  stateType: any[] = [];

  errosForm = errosForm;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _ConteneurService: ConteneurService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this._loadData();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ bookings, entrepots, types }) => {
      this.bookings = bookings;
      this.filterBooking = bookings;
      this.entrepots = entrepots;
      this.filterEntrepot = entrepots;
      this.stateType = types;
    });
  }

  setValue(event: any, champs: string) {
    if(champs === 'BOOKING') {
      this.booking_id = event.option.id
    } else if(champs === 'ENTREPOT') {
      this.entrepot_id = event.option.id
    }
  }

  createForm() {
    // Vertical stepper form
    this.form = this._formBuilder.group({
      booking_id: [null, Validators.required],
      entrepot_id: [null, Validators.required],
      numero: [null, Validators.required],
      type_tc: [null, Validators.required, Validators.min(0)],
      capacite: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if(this.form.valid) {
      const form = this.form.getRawValue();
      const data = { ...form, booking_id: this.booking_id, entrepot_id: this.entrepot_id };
      this._ConteneurService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this._snackBar._success(res?.message, null);
          this.router.navigate(['/operations/exports/parking-list/conteneurs/list']);
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
    if(champs === 'BOOKING') {
      this.filterBooking = this.bookings?.filter(item => {
        return item.numero_reel.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    } else if(champs === 'ENTREPOT') {
      this.filterEntrepot = this.entrepots?.filter(item => {
        return item.entrepot.libelle.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    }
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
