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
import { CampagneOutturnService } from '../campagne-outturn.service';

@Component({
  selector: 'app-creation-campagne-outturn',
  templateUrl: './creation-campagne-outturn.component.html',
  styleUrls: ['./creation-campagne-outturn.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class CreationCampagneOutturnComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  errosForm = errosForm;

  campagnes: CampagneRequired[] = [];
  campagne: CampagneRequired;

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des campagnes outturn', range: null },
    { label: 'Ajouter une campagne outturn', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _CampagneService: CampagneOutturnService,
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
      flag: [null, Validators.required],
      min_outturn: [0, Validators.required],
      max_outturn: [0, Validators.required],
    });
  }

  onSubmit() {
    const data = this.form.getRawValue();
    if(this.form.valid) {
      this._CampagneService
      .create(data)
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this.router.navigate(['/administration/operations/campagne/outturn/list']);
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
