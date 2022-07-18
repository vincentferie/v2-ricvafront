import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { DateUtils } from '@ricva-cajou/src/app/core/utils/date-utils';
import { environment } from '@ricva-cajou/src/environments/environment';
import { Campagne } from '../../../administration/operations/campagne/campagne.types';
import { BillOfLandingService } from '../bill-of-landing.service';
import { BillOfLanding } from '../bill-of-landing.types';

@Component({
  selector: 'app-detail-bill-of-landing',
  templateUrl: './detail-bill-of-landing.component.html',
  styleUrls: ['./detail-bill-of-landing.component.scss']
})
export class DetailBillOfLandingComponent implements OnInit {
  billOfLanding: BillOfLanding;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Exports', range: null },
    { label: 'Bill of landing', range: null },
    { label: 'Détail', range: 'last' },
  ];

  campagnes: Campagne[] = [];

  prerequisAdd: boolean = false;
  infoAdd: boolean = false;
  fileAdd: boolean = false;

  prerequisForm: FormGroup;
  infoForm: FormGroup;
  fileForm: FormGroup;

  env: string = environment.server;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: FuseSnackBarService,
    private activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _BillOfLandingService: BillOfLandingService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.billOfLanding = this._BillOfLandingService.getBillOfLanding();
    if(!this.billOfLanding) {
      this.toBack();
      return;
    }
    this._changeDetectorRef.markForCheck();
  }

  ngOnInit() {
    this.editForm();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ campagnes }) => {
      this.campagnes = campagnes;
    });
  }

  editForm() {
    this.prerequisForm = this._formBuilder.group({
      id: [this.billOfLanding?.id, Validators.required],
      numero_bl: [this.billOfLanding?.numero_bl, Validators.required],
      campagne_id: [this.billOfLanding?.campagne_id, Validators.required]
    });
    this.infoForm = this._formBuilder.group({
      id: [this.billOfLanding?.id, Validators.required],
      numero_voyage: [this.billOfLanding?.numero_voyage, Validators.required],
      provenance: [this.billOfLanding?.provenance, Validators.required],
      nom_client: [this.billOfLanding?.nom_client, Validators.required],
      adresse_client: [this.billOfLanding?.adresse_client, Validators.required],
      pays_client: [this.billOfLanding?.pays_client, Validators.required],
      destination: [this.billOfLanding?.destination, Validators.required],
      amateur: [this.billOfLanding?.amateur, Validators.required],
      port_depart: [this.billOfLanding?.port_depart, Validators.required],
      port_arrive: [this.billOfLanding?.port_arrive, Validators.required],
      date_embarquement: [DateUtils.fromJsonDate(this.billOfLanding?.date_embarquement), Validators.required],
    });
    this.fileForm = this._formBuilder.group({
      file: [null, Validators.required]
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
    if(new Date(this.f.value.date_embarquement) > new Date()) {
      this.infoForm.get('date_embarquement').setValue(null);
      this._snackBar._warning("La date d'embarquement ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(new Date())), null);
    }
    return;
  }

  _prerequisAdd(value: string) {
    this.prerequisAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
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

  _submitPrerequis() {
    if(this.prerequisForm.valid) {
      const data = { ...this.prerequisForm.getRawValue(), ...this.infoForm.getRawValue() };
      const billOfLanding = {
        ...data,
        campagne: this.campagnes.find(res => res.id === data.campagne_id)
      }
      this._BillOfLandingService.setBillOfLanding(billOfLanding);
      this._BillOfLandingService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.billOfLanding = this._BillOfLandingService.getBillOfLanding();
            this._prerequisAdd('CANCEL');
            this._changeDetectorRef.markForCheck();
          }
        }, (error: any) => {})
    }
  }

  _submitInfo() {
    if(this.infoForm.valid) {
      const data = { ...this.infoForm.getRawValue(), ...this.prerequisForm.getRawValue() };
      this._BillOfLandingService.setBillOfLanding({...data });
      this._BillOfLandingService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.billOfLanding = this._BillOfLandingService.getBillOfLanding();
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
      this._BillOfLandingService.setBillOfLanding({...data });
      this._BillOfLandingService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._fileAdd('CANCEL');
            this.billOfLanding = this._BillOfLandingService.getBillOfLanding();
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
        this._BillOfLandingService
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
    this.router.navigate(['/operations/exports/bill-of-landing/list']);
  }

  get f(): any { return this.infoForm.controls};

}
