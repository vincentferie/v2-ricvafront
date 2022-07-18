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
import { Site } from '../../site/site.types';
import { Superviseur } from '../../superviseur/superviseur.types';
import { SiteAssigneService } from '../site-assigne.service';
import { SiteAssigne } from '../site-assigne.types';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';

@Component({
  selector: 'app-detail-site-assigne',
  templateUrl: './detail-site-assigne.component.html',
  styleUrls: ['./detail-site-assigne.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class DetailSiteAssigneComponent implements OnInit {
  siteAssigne: SiteAssigne;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des site assigné', range: null },
    { label: 'Détails d\'un site assigné', range: 'last' },
  ];

  infoAdd: boolean = false;
  infoForm: FormGroup;
  sites: Site[] = [];
  superviseurs: Superviseur[] = [];

  stateActif: any[] = [
    { label: 'ACTIVER', value: true},
    { label: 'INACTIF', value: false}
  ]

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _SiteAssigneService: SiteAssigneService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.siteAssigne = this._SiteAssigneService.getSiteAssigne();
    if(!this.siteAssigne) {
      this.toBack();
      return;
    }
  }

  ngOnInit(): void {
    this.editForm();
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ sites, superviseurs }) => {
      this.superviseurs = superviseurs;
      this.sites = sites;
    })
  }

  editForm() {
    this.infoForm = this._formBuilder.group({
      id: [this.siteAssigne?.id, Validators.required],
      site_id: [this.siteAssigne?.site_id, Validators.required],
      superviseur_id: [this.siteAssigne?.superviseur_id, Validators.required],
      actif: [this.siteAssigne?.actif, Validators.required],
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
      const siteAssigne = {
        ...data,
        site: this.sites.find(res => res.id === data?.site_id),
        superviseur: this.superviseurs.find(res => res.id === data?.superviseur_id)
      }
      this._SiteAssigneService.setSiteAssigne(siteAssigne);
      this._SiteAssigneService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.siteAssigne = this._SiteAssigneService.getSiteAssigne();
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
        this._SiteAssigneService
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
    this.router.navigate(['/administration/operations/site/assigne/list']);
  }
}
