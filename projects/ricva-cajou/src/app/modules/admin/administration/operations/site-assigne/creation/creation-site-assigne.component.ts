import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { errosForm } from '@kolab/fuse/src/lib/services/globale';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { Site } from '../../site/site.types';
import { Superviseur } from '../../superviseur/superviseur.types';
import { SiteAssigneService } from '../site-assigne.service';
import { SiteAssigne } from '../site-assigne.types';

@Component({
  selector: 'app-creation-site-assigne',
  templateUrl: './creation-site-assigne.component.html',
  styleUrls: ['./creation-site-assigne.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class CreationSiteAssigneComponent implements OnInit {
  siteAssigne: SiteAssigne;
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  errosForm = errosForm;

  superviseurs: Superviseur[] = [];
  filterSuperviseur: any;
  superviseur_id: string;

  sites: Site[] = [];
  filterSite: any;
  site_id: string;

  stateActif: any[] = [
    { label: 'ACTIVER', value: true},
    { label: 'INACTIF', value: false}
  ]

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des entrepôts assignés', range: null },
    { label: 'Détails d\'un entrepôt assigné', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _SiteAssigneService: SiteAssigneService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.createForm();
  }

  /**
   * On init
   */
  ngOnInit(): void {
    this._loadData();
  }

  ngAfterViewInit(): void {
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ sites, superviseurs }) => {
      this.superviseurs = superviseurs;
      this.filterSuperviseur = superviseurs;
      this.sites = sites;
      this.filterSite = sites;
    })
  }

  createForm() {
    this.form = this._formBuilder.group({
      superviseur_id: [null, Validators.required],
      site_id: [null, Validators.required],
      actif: [null, Validators.required],
    });

    this.form.get('superviseur_id').valueChanges.subscribe(res => {
      this._filter(res, 'SUPERVISEUR');
    });
    this.form.get('site_id').valueChanges.subscribe(res => {
      this._filter(res, 'SITE');
    });
  }

  setValue(event: any, champs: string) {
    if(champs === 'SUPERVISEUR') {
      this.superviseur_id = event.option.id
    } else if(champs === 'SITE') {
      this.site_id = event.option.id
    }
  }

  _filter(value: any, champs: string): any {
    if(champs === 'SITE') {
      this.filterSite = this.sites?.filter(item => {
        return item?.libelle.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    } else if(champs === 'SUPERVISEUR') {
      this.filterSuperviseur = this.superviseurs?.filter(item => {
        return item.nom.toLowerCase().indexOf(value.toLowerCase()) > -1;
      })
    }
  }

  onSubmit() {
    const form = this.form.getRawValue();
    const data = { ...form, superviseur_id: this.superviseur_id, site_id: this.site_id };
    if(this.form.valid) {
      this._SiteAssigneService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this.toBack();
          return;
        }
      }, (error: any) => {})
    }
  }

  confirmeSubmit() {
    const dialogRef = this._fuseConfirmationService.open({
      title: 'Voulez-vous enregistrer ?',
      message: '',
      icon: { show: false },
      actions: {
        confirm: {
          show: true,
          label: 'OUI',
          color: 'primary',
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

  toBack(): void {
    this.router.navigate(['/administration/operations/site/assigne/list']);
  }
}
