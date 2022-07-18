import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnvRequired, MyErrorStateMatcher } from '@kolab/fuse/src/public-api';
import { Observable } from 'rxjs';
import { EntrepotService } from '../../../administration/operations/entrepot/entrepot.service';
import { CampagneService } from '../../../administration/operations/campagne/campagne.service';
import { Campagne } from '../../../administration/operations/campagne/campagne.types';
import { Entrepot } from '../../../administration/operations/entrepot/entrepot.types';

@Component({
  selector: 'app-inventaire',
  templateUrl: './inventaire.component.html',
  styleUrls: ['./inventaire.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InventaireComponent implements OnInit {
  formFiltre: FormGroup;
  matcher = new MyErrorStateMatcher();
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Statistiques', range: null },
    { label: 'Inventaire', range: 'last' },
  ];
  headerDetail = [
    { value: 'entrepot', label: 'Entrepôt', name: 'Entrepôt', class: ''},
    { value: 'statut', label: 'Statut', name: 'Statut', class: ''},
    { value: 'lot', label: 'Lot', name: 'Lot', class: ''},
    { value: 'restant', label: 'Restant', name: 'Sac restant', class: ''},
    { value: 'stocke', label: 'Stocké', name: 'Sac stocké', class: ''},
    { value: 'poids', label: 'Poids', name: 'Poids net', class: ''},
    { value: 'out', label: 'Out', name: 'Out run', class: ''},
  ];
  headerGeneral = [
    { value: 'entrepot', label: 'Entrepôt', name: 'Entrepôt', class: ''},
    { value: 'controle', label: 'Contrôle', name: 'Contrôle', class: ''},
    { value: 'lot', label: 'Lot', name: 'Lot', class: ''},
    { value: 'stock', label: 'Stock', name: 'En stock', class: ''},
    { value: 'poids', label: 'Poids', name: 'Poids net', class: ''},
    { value: 'out', label: 'Out', name: 'Out run', class: ''},
  ];
  headerNanti = [
    { value: 'entrepot', label: 'Entrepôt', name: 'Entrepôt', class: ''},
    { value: 'nanti', label: 'Nanti', name: 'Lot nanti', class: ''},
    { value: 'lot', label: 'Lot', name: 'Lot', class: ''},
    { value: 'restant', label: 'Restant', name: 'Sac restant', class: ''},
    { value: 'stock', label: 'Stocké', name: 'Sac stocké', class: ''},
    { value: 'poids', label: 'Poids', name: 'Poids net', class: ''},
    { value: 'out', label: 'Out', name: 'Out run', class: ''},
  ];
  headerLot = [
    { value: 'entrepot', label: 'Entrepôt', name: 'Entrepôt', class: ''},
    { value: 'statut', label: 'Statut zonage', name: 'Statut zonage', class: ''},
    { value: 'lot', label: 'Lot', name: 'Lot', class: ''},
    { value: 'poids', label: 'Poids', name: 'Poids net', class: ''},
    { value: 'out', label: 'Out', name: 'Out run', class: ''},
  ];
  headerExportateur = [
    { value: 'exportateur', label: 'Exportateur', name: 'Exportateur', class: ''},
    { value: 'lot', label: 'Lot', name: 'Lot', class: ''},
    { value: 'total', label: 'Total', name: 'Sac total', class: ''},
    { value: 'stock', label: 'Stock', name: 'Sac en stock', class: ''},
    { value: 'poids', label: 'Poids', name: 'Poids net', class: ''},
    { value: 'out', label: 'Out', name: 'Out run', class: ''},
  ];
  headerInventaire = [
    { value: 'entrepot', label: 'Entrepôt', name: 'Entrepôt', class: ''},
    { value: 'zonning', label: 'Zonning', name: 'Zonning', class: ''},
    { value: 'exportateur', label: 'Exportateur', name: 'Exportateur', class: ''},
    { value: 'lot', label: 'Lot', name: 'Lot', class: ''},
    { value: 'statut', label: 'Statut', name: 'Statut', class: ''},
    { value: 'restant', label: 'Restant', name: 'Restant', class: ''},
    { value: 'stock', label: 'Stock', name: 'Stock', class: ''},
    { value: 'poids', label: 'Poids', name: 'Poids net', class: ''},
  ];


  // Environnement Required
  campagnes$: Observable<Campagne[]>;
  entrepots$: Observable<Entrepot[]>;
  details: any[] = [
    {
      one: 'ACIPAC YOP',
      two: 'Empoté',
      three: '0',
      four: '0',
      five: '0',
      six: '0',
      seven: '0'
    },
    {
      one: 'ACIPAC YOP',
      two: 'Partiellement empoté',
      three: '644',
      four: '185746',
      five: '312835',
      six: '2593004',
      seven: '45.2590753115'
    }
  ];
  generales: any[] = [
    {
      one: 'ACIPAC YOP',
      two: 'Totalement empotés',
      three: '644',
      four: '312835',
      five: '25933004',
      six: '45.2590753115'
    },
    {
      one: 'ACIPAC YOP',
      two: 'Non empotés',
      three: '36',
      four: '17253',
      five: '1429837',
      six: '45.2590753115',
    }
  ];
  nantis: any[] = [
    {
      one: 'ACIPAC YOP',
      two: 'Nanti',
      three: '0',
      four: '0',
      five: '0',
      six: '0',
      seven: '0',
    },
    {
      one: 'ACIPAC YOP',
      two: 'Partiellement empotés',
      three: '644',
      four: '185746',
      five: '312835',
      six: '259330004',
      seven: '45.2590753115',
    }
  ];
  lots: any[] = [
    {
      one: 'ACIPAC YOP',
      two: 'Normal',
      three: '296',
      four: '11777571',
      five: '45.2590753115'
    },
    {
      one: 'ACIPAC YOP',
      two: 'Zonning',
      three: '0',
      four: '0',
      five: '0'
    }
  ];
  exportateurs: any[] = [
    {
      one: 'AGRINORD',
      two: '610',
      three: '175549',
      four: '295854',
      five: '25578457',
      six: '45.2590753115'
    },
    {
      one: 'CABN',
      two: '0',
      three: '0',
      four: '0',
      five: '0',
      six: '0'
    }
  ];
  inventaires: any[] = [
    {
      one: 'ACIPAC YOP',
      two: 'Empotés partiel / Non empotés',
      three: 'AGRINORD',
      four: '2',
      five: 'Empotés partiel / Non empotés',
      six: '126',
      seven: '441',
      eight: '36595'
    },
    {
      one: 'ACIPAC YOP',
      two: 'Empotés partiel / Non empotés',
      three: 'AGRINORD',
      four: '2',
      five: 'Empotés partiel / Non empotés',
      six: '126',
      seven: '441',
      eight: '36595'
    }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _CampagneService: CampagneService,
    private _EntrepotService: EntrepotService
  ) {
    this.filtreForm();
  }

  ngOnInit(): void {
    // Call observable
    this.campagnes$ = this._CampagneService.campagnes$;
    this.entrepots$ = this._EntrepotService.entrepots$;
  }

  filtreForm() {
    this.formFiltre = this._formBuilder.group({
      campagne: [null, Validators.required],
      entrepot: [null, Validators.required],
    });
  }
}
