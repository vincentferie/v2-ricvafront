import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { ExportateurService } from '../exportateur.service';
import { Exportateur } from '../exportateur.types';

@Component({
  selector: 'app-detail-exportateur',
  templateUrl: './detail-exportateur.component.html',
  styleUrls: ['./detail-exportateur.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class DetailExportateurComponent implements OnInit {
  exportateur: Exportateur;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des exportateurs', range: null },
    { label: 'Détails d\'un exportateur', range: 'last' },
  ];

  infoAdd: boolean = false;
  infoForm: FormGroup;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ExportateurService: ExportateurService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.exportateur = this._ExportateurService.getExportateur();
    if(!this.exportateur) {
      this.toBack();
      return;
    }
    this._changeDetectorRef.markForCheck();
  }

  async ngOnInit() {
    await this.editForm();
  }

  editForm() {
    this.infoForm = this._formBuilder.group({
      id: [this.exportateur?.id, Validators.required],
      raison: [this.exportateur?.raison, Validators.required],
      contribuable: [this.exportateur?.contribuable, Validators.required],
      contact: [this.exportateur?.contact, Validators.required],
      email: [this.exportateur?.email, Validators.required],
      postal: [this.exportateur?.postal, Validators.required],
      lieu: [this.exportateur?.lieu, Validators.required],
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
      this._ExportateurService.setExportateur(data)
      this._ExportateurService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._infoAdd('CANCEL');
            this.exportateur = this._ExportateurService.getExportateur();
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
        this._ExportateurService
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
    this.router.navigate(['/administration/operations/exportateur/list']);
  }
}
