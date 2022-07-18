import { Entrepot } from './../entrepot.types';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { EntrepotService } from '../entrepot.service';
import { Site } from '../../site/site.types';

@Component({
  selector: 'app-detail-entrepot',
  templateUrl: './detail-entrepot.component.html',
  styleUrls: ['./detail-entrepot.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class DetailEntrepotComponent implements OnInit {
  entrepot: Entrepot;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des entrepôts', range: null },
    { label: 'Détails d\'un entrepôt', range: 'last' },
  ];

  infoAdd: boolean = false;
  infoForm: FormGroup;
  sites: Site[] = [];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _EntrepotService: EntrepotService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.entrepot = this._EntrepotService.getEntrepot();
    if(!this.entrepot) {
      this.toBack();
      return;
    }
    this._changeDetectorRef.markForCheck();
  }

  ngOnInit() {
    this.editForm();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ sites }) => {
      this.sites = sites;
    });
  }

  editForm() {
    this.infoForm = this._formBuilder.group({
      id: [this.entrepot?.id, Validators.required],
      libelle: [this.entrepot?.libelle, Validators.required],
      coordonneex: [this.entrepot?.coordonneex, Validators.required],
      coordonneey: [this.entrepot?.coordonneey, Validators.required],
      superficie: [this.entrepot?.superficie, Validators.required],
      site_id: [this.entrepot?.site_id, Validators.required]
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
      const entrepot = {
        ...data,
        site: this.sites.find(res => res.id === data.site_id)
      }
      this._EntrepotService.setEntrepot(entrepot)
      this._EntrepotService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.entrepot = this._EntrepotService.getEntrepot();
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
        this._EntrepotService
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
    this.router.navigate(['/administration/operations/entrepot/list']);
  }
}
