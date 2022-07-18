import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExchangeService } from '@ricva-cajou/src/app/core/communication/exchange-component.service';
import { Subject, takeUntil } from 'rxjs';
import { PlanEmpotageService } from '../plan-empotage.service';

@Component({
  selector: 'app-detail-plan-empotage',
  templateUrl: './detail-plan-empotage.component.html',
  styleUrls: ['./detail-plan-empotage.component.scss']
})
export class DetailPlanEmpotageComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  myParam: any;
  planEmpotage: any;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Empotage', range: null },
    { label: 'Plan d\'empotage', range: null },
    { label: 'Détail', range: 'last' },
  ];

  prerequisAdd: boolean = false;
  siteAdd: boolean = false;
  lotAdd: boolean = false;

  prerequisForm: FormGroup;
  siteForm: FormGroup;
  lotForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _messageService: ExchangeService,
    private _PlanEmpotageService: PlanEmpotageService
  ) {
    this.editForm();
  }

  ngOnInit() {
    this._messageService.subscriber$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((message) => {
        // Update the pagination
        this.myParam = message;
        // Get the planEmpotage
        this._PlanEmpotageService.planEmpotages$.subscribe(planEmpotages => {
          this.planEmpotage = planEmpotages.find((res: any) => {
            if(res?.id === this.myParam?.data) {
              return res;
            }
          });
        });
      });
  }

  editForm() {
    this.prerequisForm = this._formBuilder.group({
      contrat: ['Contrat 02', Validators.required],
      quantite: [300, Validators.required],
    });
    this.siteForm = this._formBuilder.group({
      contrat: ['Contrat 02', Validators.required],
      quantite: [300, Validators.required],
    });
    this.lotForm = this._formBuilder.group({
      lots: this._formBuilder.array(this._itemLots()),
    });
  }

  _itemLots(): FormGroup[] {
    const arr: any[] = [];
    for (let index = 0; index <= 2; index++) {
      arr.push(
        this._formBuilder.group({
          key: [null],
          lot: [null, Validators.required]
        })
      );
    }

    return arr;
  }

  _deleteLot(row: any) {
    const index = this.lot.controls.indexOf(row);
    this.lot.controls.splice(index, 1);
  }

  _prerequisAdd(value: string) {
    this.prerequisAdd = value === 'ADD' ? true : false;
  }

  _siteAdd(value: string) {
    this.siteAdd = value === 'ADD' ? true : false;
  }

  // METHODE SUBMIT

  _submitPrerequis() {
    const form = this.prerequisForm.getRawValue();
    this._prerequisAdd('CANCEL');
  }

  _submitSite() {
    const form = this.siteForm.getRawValue();
    this._siteAdd('CANCEL');
  }

  _submitLot() {
    const form = this.lotForm.getRawValue();
  }

  get lot() { return this.lotForm.get('lots') as FormArray; }

}
