import { EntrepotService } from './../entrepot.service';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { errosForm } from '@kolab/fuse/src/lib/services/globale';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from '../../site/site.types';

@Component({
  selector: 'app-creation-entrepot',
  templateUrl: './creation-entrepot.component.html',
  styleUrls: ['./creation-entrepot.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class CreationEntrepotComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  errosForm = errosForm;

  sites: Site[] = [];
  filterSite: any;
  site_id: string;

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des entrepôts', range: null },
    { label: 'Ajouter un entrepôt', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _EntrepotService: EntrepotService,
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
    this.activatedRoute.data.subscribe(({ sites }) => {
      this.sites = sites;
      this.filterSite = sites;
    });
  }

  createForm() {
    this.form = this._formBuilder.group({
      libelle: [null, Validators.required],
      coordonneex: [0, Validators.required],
      coordonneey: [0, Validators.required],
      superficie: [0, Validators.required],
      site_id: [null, Validators.required]
    });

    this.form.get('site_id').valueChanges.subscribe(res => {
      this._filter(res);
    });
  }

  setValue(event: any) {
    this.site_id = event.option.id;
  }

  _filter(value: any): any {
    this.filterSite = this.sites?.filter(item => {
      return item.libelle.toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
  }

  onSubmit() {
    const form = this.form.getRawValue();
    const data = { ...form, site_id: this.site_id };
    if(this.form.valid) {
      this._EntrepotService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this.router.navigate(['/administration/operations/entrepot/list']);
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
