import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Decrypt } from '@kolab/fuse/src/lib/services/globale';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { environment } from '@ricva-cajou/src/environments/environment';
import { BookingService } from '../booking.service';
import { Booking } from '../booking.types';

@Component({
  selector: 'app-detail-booking',
  templateUrl: './detail-booking.component.html',
  styleUrls: ['./detail-booking.component.scss']
})
export class DetailBookingComponent implements OnInit {
  booking: Booking;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Exports', range: null },
    { label: 'Parking list', range: null },
    { label: 'Bookings', range: null },
    { label: 'Détail', range: 'last' },
  ];

  infoAdd: boolean = false;
  fileAdd: boolean = false;

  infoForm: FormGroup;
  fileForm: FormGroup;

  stateBooking: any[] = []

  env: string = environment.server;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _BookingService: BookingService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.booking = this._BookingService.getBooking();
    if(!this.booking) {
      this.toBack();
      return;
    }

    this._changeDetectorRef.markForCheck();
  }

  ngOnInit() {
    this.editForm();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ states }) => {
      this.stateBooking = states;
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
    this.infoForm.get('file').setValue(file)
  }

  editForm() {
    this.infoForm = this._formBuilder.group({
      id: [this.booking?.id, Validators.required],
      numero_reel: [this.booking?.numero_reel, Validators.required],
      numero_change: [this.booking?.numero_change, Validators.required],
      state: [this.booking?.state, Validators.required],
    });
    this.fileForm = this._formBuilder.group({
      file: [null]
    });
  }

  _infoAdd(value: string) {
    this.infoAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _fileAdd(value: string) {
    this.fileAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  // METHODE SUBMIT

  _submitInfo() {
    if(this.infoForm.valid) {
      const data = this.infoForm.getRawValue();
      this._BookingService.setBooking(data);
      this._BookingService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.booking = this._BookingService.getBooking();
            this._infoAdd('CANCEL');
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
      this._BookingService.setBooking(data)
      this._BookingService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._fileAdd('CANCEL');
            this.booking = this._BookingService.getBooking();
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
        this._BookingService
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
    this.router.navigate(['/operations/exports/parking-list/bookings/list']);
  }

}
