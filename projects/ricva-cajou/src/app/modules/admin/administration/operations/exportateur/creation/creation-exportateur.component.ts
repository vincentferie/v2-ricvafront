import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { errosForm } from '@kolab/fuse/src/lib/services/globale';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { ExportateurService } from '../exportateur.service';

@Component({
  selector: 'app-creation-exportateur',
  templateUrl: './creation-exportateur.component.html',
  styleUrls: ['./creation-exportateur.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class CreationExportateurComponent implements OnInit {
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  errosForm = errosForm;

  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des exportateurs', range: null },
    { label: 'Ajouter un exportateur', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private _ExportateurService: ExportateurService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.createForm();
  }

  /**
   * On init
   */
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  createForm() {
    this.form = this._formBuilder.group({
      id: [null],
      raison: [null, Validators.required],
      contribuable: [null, Validators.required],
      contact: [null, Validators.required],
      email: [null, Validators.required],
      postal: [null, Validators.required],
      lieu: [null, Validators.required]
    });
  }

  onSubmit() {
    if(this.form.valid) {
      this._ExportateurService
      .create(this.form.getRawValue())
      .subscribe((res: any) => {
        if(res?.state >= 200 && res?.state <= 202){
          this.router.navigate(['/administration/operations/exportateur/list']);
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
