import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { errosForm } from '@kolab/fuse/src/lib/services/globale';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { Observable, Subject } from 'rxjs';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-creation-booking',
  templateUrl: './creation-booking.component.html',
  styleUrls: ['./creation-booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreationBookingComponent implements OnInit {
  @ViewChild('stepper')
  stepper: MatStepper;
  form: FormGroup;
  isEditable = true;
  matcher = new MyErrorStateMatcher();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Exports', range: null },
    { label: 'Parking list', range: null },
    { label: 'Bookings', range: null },
    { label: 'Création', range: 'last' },
  ];

  stateBooking: any[] = []

  errosForm = errosForm;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _BookingService: BookingService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this._loadData();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ states }) => {
      this.stateBooking = states;
    });
  }

  createForm() {
    // Vertical stepper form
    this.form = this._formBuilder.group({
      numero_reel: [null, Validators.required],
      numero_change: [null, Validators.required],
      state: [null, Validators.required],
      file: [null],
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
    this.form.get('file').setValue(file)
  }

  onSubmit() {
    if(this.form.valid) {
      let data: any = new FormData();
      Object.keys(this.form.getRawValue()).forEach(item => {
        data.append(item, this.form.get(item).value);
      });
      this._BookingService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this._snackBar._success(res?.message, null);
          this.router.navigate(['/operations/exports/parking-list/bookings/list']);
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
