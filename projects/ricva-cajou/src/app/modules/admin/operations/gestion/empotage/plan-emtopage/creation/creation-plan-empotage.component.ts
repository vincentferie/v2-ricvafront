import { EntrepotAssigne } from './../../../../../administration/operations/entrepot-assigne/entrepot-assigne.types';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { Observable, Subject } from 'rxjs';
import { BookingService } from '../../../../exports/parking-list/bookings/booking.service';
import { Booking } from '../../../../exports/parking-list/bookings/booking.types';
import { ConteneurService } from '../../../../exports/parking-list/conteneurs/conteneur.service';
import { Conteneur } from '../../../../exports/parking-list/conteneurs/conteneur.types';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { errosForm } from '@kolab/fuse/src/lib/services/globale';
import { EntreposageService } from '../../../entreposage/entreposage.service';
import { TransitaireService } from '@ricva-cajou/src/app/modules/admin/administration/operations/transitaire/transitaire.service';
import { Entreposage } from '../../../entreposage/entreposage.types';
import { Transitaire } from '@ricva-cajou/src/app/modules/admin/administration/operations/transitaire/transitaire.types';
import { EntrepotAssigneService } from '@ricva-cajou/src/app/modules/admin/administration/operations/entrepot-assigne/entrepot-assigne.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-creation-plan-empotage',
  templateUrl: './creation-plan-empotage.component.html',
  styleUrls: ['./creation-plan-empotage.component.scss']
})
export class CreationPlanEmpotageComponent implements OnInit {
  @ViewChild('stepper')
  stepper: MatStepper;
  verticalStepperForm: FormGroup;
  isEditable = true;
  matcher = new MyErrorStateMatcher();

  // Environnement Required
  contrats$: Observable<any[]>;
  bookings$: Observable<Booking[]>;
  conteneurs$: Observable<Conteneur[]>;
  entrepots$: Observable<EntrepotAssigne[]>;
  transitaires$: Observable<Transitaire[]>;
  lots$: Observable<Entreposage[]>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  maxContainer = 310;

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Empotage', range: null },
    { label: 'Plan d\'empotage', range: null },
    { label: 'Création', range: 'last' },
  ];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  conteneurs: string[] = [];

  @ViewChild('conteneurInput') conteneurInput: ElementRef<HTMLInputElement>;

  errosForm = errosForm;

  constructor(
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _BookingService: BookingService,
    private _ConteneurService: ConteneurService,
    private _EntreposageService: EntreposageService,
    private _TransitaireService: TransitaireService,
    private _EntrepotAssigneService: EntrepotAssigneService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this._loadData();
  }

  _loadData() {
    // Call observable
    this.bookings$ = this._BookingService.bookings$;
    this.entrepots$ = this._EntrepotAssigneService.entrepotAssignes$;
    this.transitaires$ = this._TransitaireService.transitaires$;
  }

  createForm() {
    // Vertical stepper form
    this.verticalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        type: [false],
        contrat: [null],
        quantite: [0],
        premium: [0],
        qualite: [0],
        discompte: [0],
      }),
      step2: this._formBuilder.group({
        booking_id: [null],
        conteneurs: [[]],
        entrepot_id: [null],
        transitaire_id: [null],
      }),
      step3: this._formBuilder.group({
        lots: [{ value: [], disabled: true }],
        sac: [0],
      }),
      step4: this._formBuilder.group({
        lots: [null],
      }),
    });
  }

  confirmeSubmit() {
    const dialogRef = this._fuseConfirmationService.open({
      title: 'Voulez-vous enregistrer ?',
      message: '',
      icon: { show: false },
      actions: {
        confirm: {
          show: true,
          label: 'Enregistrer',
          color: 'primary',
        },
        cancel: {
          show: true,
          label: 'Annuler',
        },
      },
      dismissible: true,
    })

    dialogRef.afterClosed().subscribe(value => {
      if(value === 'confirmed') {
        console.log(this.verticalStepperForm.value)
      }
    });
  }

  onContainer() {
    this.conteneurInput.nativeElement.disabled = true;
    const uuid = this.verticalStepperForm.get('step2').get('booking_id').value;
    if(uuid) {
      this.conteneurs$ = this._ConteneurService.getNoStuffing(uuid);
      this.conteneurInput.nativeElement.disabled = false;
    }
  }

  onEntrepot() {
    const uuid = this.verticalStepperForm.get('step2').get('entrepot_id').value;
    if(uuid) {
      this.lots$ = this._EntreposageService.getNoStuffing(uuid);
      this.verticalStepperForm.get('step3').get('lots').enable();
      console.log(uuid, this.verticalStepperForm.get('step3').get('lots').enabled);
    }
  }

  remove(fruit: string): void {
    const index = this.conteneurs.indexOf(fruit);

    if (index >= 0) {
      this.conteneurs.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.conteneurs.push(event.option.viewValue);
    this.verticalStepperForm.get('step2')?.get('conteneurs')?.setValue(null);
  }

  /**
   * Stepper hide / Show
   *
   * @param index
   * @return void
   */
  selectionChange(event: any) {
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
