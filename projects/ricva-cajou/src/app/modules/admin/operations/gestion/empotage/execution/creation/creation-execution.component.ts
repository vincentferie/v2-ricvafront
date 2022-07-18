import { Entreposage } from './../../../entreposage/entreposage.types';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { FuseConfirmationService, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { Observable, Subject } from 'rxjs';
import { ConteneurService } from '../../../../exports/parking-list/conteneurs/conteneur.service';
import { Conteneur } from '../../../../exports/parking-list/conteneurs/conteneur.types';
import { PlanEmpotageService } from '../../plan-emtopage/plan-empotage.service';
import { PlanEmpotage } from '../../plan-emtopage/plan-empotage.types';
import { errosForm } from '@kolab/fuse/src/lib/services/globale';
import { EntreposageService } from '../../../entreposage/entreposage.service';

@Component({
  selector: 'app-creation-execution',
  templateUrl: './creation-execution.component.html',
  styleUrls: ['./creation-execution.component.scss']
})
export class CreationExecutionComponent implements OnInit {
  @ViewChild('stepper')
  stepper: MatStepper;
  form: FormGroup;
  isEditable = true;
  matcher = new MyErrorStateMatcher();

  // Environnement Required
  conteneurs$: Observable<Conteneur[]>;
  plans$: Observable<PlanEmpotage[]>;
  lots$: Observable<Entreposage[]>;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  stepOne = true;
  stepTwo = false;
  stepThree = false;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Empotage', range: null },
    { label: 'Execution', range: null },
    { label: 'Création', range: 'last' },
  ];

  nbr: number = 310;

  errosForm = errosForm;

  constructor(
    private _ConteneurService: ConteneurService,
    private _EntreposageService: EntreposageService,
    private _PlanEmpotageService: PlanEmpotageService,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    // Call observable
    this.conteneurs$ = this._ConteneurService.conteneurs$;
    this.plans$ = this._PlanEmpotageService.planEmpotages$;
    this.lots$ = this._EntreposageService.entreposages$;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  createForm() {
    // Vertical stepper form
    this.form = this._formBuilder.group({
      plan: [null, Validators.required],
      options: this._formBuilder.array(this._itemOptions()),
    });
  }

  confirmeSubmit() {
    const dialogRef = this._fuseConfirmationService.open({
      title: 'Voulez-vous enregistrer ?',
      message: '',
      icon: { show: false },
      actions: {
        confirm: {
          show: true,
          label: 'Enregistrer',
          color: 'primary',
        },
        cancel: {
          show: true,
          label: 'Annuler',
        },
      },
      dismissible: true,
    })

    dialogRef.afterClosed().subscribe(value => {
      if(value === 'confirmed') {
        console.log(this.form.value)
      }
    });
  }

  _itemOptions(): FormGroup[] {
    const arr: any[] = [];
    arr.push(
      this._formBuilder.group({
        key: [null],
        conteneur: [null, Validators.required],
        nbr: [0, [Validators.required, Validators.max(this.nbr)]],
        lots: this._formBuilder.array(this._itemLots())
      })
    );

    return arr;
  }

  _itemLots(): FormGroup[] {
    const arr: any[] = [];
    arr.push(
      this._formBuilder.group({
        key: [null],
        lot: [null, Validators.required],
        sac: [0, [Validators.required, Validators.min(1), Validators.max(this.nbr)]],
      })
    );

    return arr;
  }

  _addOption() {
    return this.option.push(
      this._formBuilder.group({
        key: [null],
        conteneur: [null, Validators.required],
        nbr: [0, [Validators.required, Validators.max(this.nbr)]],
        lots: this._formBuilder.array(this._itemLots())
      })
    );
  }

  _addLot(conteneur: number) {
    const control = this.form.get(`options.${conteneur}.lots`) as FormArray;
    control.push(
      this._formBuilder.group({
        key: [null],
        lot: [null, Validators.required],
        sac: [0, [Validators.required, Validators.min(1), Validators.max(this.nbr)]],
      })
    );
  }

  _deleteOption(row: any) {
    const index = this.option.controls.indexOf(row);
    this.option.controls.splice(index, 1);
  }

  _deleteLot(i: number, row: any) {
    // @ts-ignore
    this.option.at(i).get('lots').removeAt(row);
  }

  _getLot(uuid: any): string {
    let lot = null;
    this.lots$.subscribe(res => {
      res.find((res: any) => {res.id === uuid})
    })
    return lot;
  }

  _getConteneur(uuid: any): string {
    let conteneur = null;
    this.conteneurs$.subscribe(res => {
      res.find((res: any) => {res.id === uuid})
    })
    return conteneur;
  }

  _onSacCalcul(lot: any, option: any) {
    let total = this._onTotalSac(option);
    if (total > this.nbr) {
      const dialogRef = this._fuseConfirmationService.open({
        title: 'Le conteneur ' + this._getConteneur(option.get('conteneur').value) + ' ne peut contenir plus de 310 sacs !',
        message: '',
        icon: {
          show: true,
          color: 'warning'
        },
        actions: {
          confirm: { show: false },
          cancel: { show: false },
        },
        dismissible: true,
      })
      lot.get('sac').setValue(0);
      total = this._onTotalSac(option);
    }
    option.get('nbr').setValue(total);
  }

  _onTotalSac(option: any) {
    let total = 0;
    option.get('lots').controls.forEach((element: any) => {
      total += element.value.sac;
    });
    return total;
  }

  /**
   * Stepper hide / Show
   *
   * @param index
   * @return void
   */
  selectionChange(event: any) {
  }

  get option() { return this.form.get('options') as FormArray; }
  lot(i: number) { return this.option.controls[i].get('lots') as FormArray; }
}
