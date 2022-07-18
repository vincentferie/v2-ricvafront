import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { CampagneRequired } from '../../required/required.types';
import { errosForm } from '@kolab/fuse/src/lib/services/globale';
import { CampagneService } from '../campagne.service';
import { DateUtils } from '@ricva-cajou/src/app/core/utils/date-utils';

@Component({
  selector: 'app-creation-campagne',
  templateUrl: './creation-campagne.component.html',
  styleUrls: ['./creation-campagne.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class CreationCampagneComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  errosForm = errosForm;

  campagnes: CampagneRequired[] = [];
  campagne: CampagneRequired;

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des campagnes', range: null },
    { label: 'Ajouter une campagne', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _CampagneService: CampagneService,
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
    this.activatedRoute.data.subscribe(({ campagnes }) => {
      this.campagnes = campagnes;
    });
  }

  createForm() {
    this.form = this._formBuilder.group({
      campagne_id: [null, Validators.required],
      libelle: [null, Validators.required],
      ouverture: [null, Validators.required],
      fermeture: [null, Validators.required],
    });
  }

  onCampagne() {
    this.campagne = this.campagnes.find(res => res?.id === this.form.value.campagne_id);
    this.form.get('libelle').setValue(this.campagne?.libelle);
    this.form.get('ouverture').setValue(DateUtils.fromJsonDate(this.campagne?.ouverture));
    this.form.get('fermeture').setValue(DateUtils.fromJsonDate(this.campagne?.fermeture));
  }

  onSubmit() {
    const data = this.form.getRawValue();
    if(this.form.valid) {
      this._CampagneService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this.router.navigate(['/administration/operations/campagne/list']);
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
