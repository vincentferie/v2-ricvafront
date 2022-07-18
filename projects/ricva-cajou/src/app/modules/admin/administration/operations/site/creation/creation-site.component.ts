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
import { Ville } from '../../ville/ville.types';
import { SiteService } from '../site.service';

@Component({
  selector: 'app-creation-site',
  templateUrl: './creation-site.component.html',
  styleUrls: ['./creation-site.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class CreationSiteComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  errosForm = errosForm;

  villes: Ville[] = [];
  filterVille: any;
  ville_id: string;

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des sites', range: null },
    { label: 'Ajouter un site', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _SiteService: SiteService,
    private activatedRoute: ActivatedRoute,
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
    this.activatedRoute.data.subscribe(({ villes }) => {
      this.villes = villes;
      this.filterVille = villes;
    });
  }

  createForm() {
    this.form = this._formBuilder.group({
      libelle: [null, Validators.required],
      coordonneex: [0, Validators.required],
      coordonneey: [0, Validators.required],
      superficie: [0, Validators.required],
      ville_id: [null, Validators.required]
    });

    this.form.get('ville_id').valueChanges.subscribe(res => {
      this._filter(res);
    });
  }

  setValue(event: any) {
    this.ville_id = event.option.id;
  }

  _filter(value: any): any {
    this.filterVille = this.villes?.filter(item => {
      return item.libelle.toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
  }

  onSubmit() {
    const form = this.form.getRawValue();
    const data = { ...form, ville_id: this.ville_id };
    if(this.form.valid) {
      this._SiteService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this.router.navigate(['/administration/operations/site/list']);
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
}
