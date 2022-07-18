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
import { DateUtils } from '@ricva-cajou/src/app/core/utils/date-utils';
import { CampagneService } from '../../campagne/campagne.service';
import { CampagneRequired } from '../../required/required.types';
import { Campagne } from '../campagne.types';

@Component({
  selector: 'app-detail-campagne',
  templateUrl: './detail-campagne.component.html',
  styleUrls: ['./detail-campagne.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class DetailCampagneComponent implements OnInit {
  campagne: Campagne;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des campagnes', range: null },
    { label: 'Détails d\'un campagne', range: 'last' },
  ];

  infoAdd: boolean = false;
  infoForm: FormGroup;
  campagnes: CampagneRequired[] = [];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _CampagneService: CampagneService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.campagne = this._CampagneService.getCampagne();
    if(!this.campagne) {
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
    this.infoForm = this._formBuilder.group({
      id: [this.campagne?.id, Validators.required],
      libelle: [this.campagne?.libelle, Validators.required],
      campagne_id: [this.campagne?.campagne_id, Validators.required],
      ouverture: [DateUtils.fromJsonDate(this.campagne?.ouverture), Validators.required],
      fermeture: [DateUtils.fromJsonDate(this.campagne?.fermeture), Validators.required],
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
      const campagne = {
        ...data,
        masterCampagne: this.campagnes.find(res => res.id === data.campagne_id)
      }
      this._CampagneService.setCampagne(campagne)
      this._CampagneService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.campagne = this._CampagneService.getCampagne();
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
        this._CampagneService
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
    this.router.navigate(['/administration/operations/campagne/list']);
  }
}
