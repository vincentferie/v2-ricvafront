import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { Ville } from '../../ville/ville.types';
import { Site } from '../site.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SiteService } from '../site.service';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';

@Component({
  selector: 'app-detail-site',
  templateUrl: './detail-site.component.html',
  styleUrls: ['./detail-site.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class DetailSiteComponent implements OnInit {
  site: Site;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des sites', range: null },
    { label: 'Détails d\'un site', range: 'last' },
  ];

  infoAdd: boolean = false;
  infoForm: FormGroup;
  villes: Ville[] = [];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _SiteService: SiteService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.site = this._SiteService.getSite();
    if(!this.site) {
      this.toBack();
      return;
    }
    this._changeDetectorRef.markForCheck();
  }

  ngOnInit() {
    this.editForm();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ villes }) => {
      this.villes = villes;
    });
  }

  editForm() {
    this.infoForm = this._formBuilder.group({
      id: [this.site?.id, Validators.required],
      libelle: [this.site?.libelle, Validators.required],
      superficie: [this.site?.superficie, Validators.required],
      coordonneex: [this.site?.coordonneex, Validators.required],
      coordonneey: [this.site?.coordonneey, Validators.required],
      ville_id: [this.site?.ville_id, Validators.required]
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
      const site = {
        ...data,
        ville: this.villes.find(res => res.id === data.ville_id)
      }
      this._SiteService.setSite(site)
      this._SiteService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this._infoAdd('CANCEL');
            this.site = this._SiteService.getSite();
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
        this._SiteService
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
    this.router.navigate(['/administration/operations/site/list']);
  }
}
