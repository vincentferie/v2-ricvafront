import { EntrepotAssigne } from './../../../../administration/operations/entrepot-assigne/entrepot-assigne.types';
import { Ville } from './../../../../administration/operations/ville/ville.types';
import { Campagne } from '@ricva-cajou/src/app/modules/admin/administration/operations/campagne/campagne.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EntreposageService } from '../entreposage.service';
import { Dechargement } from '../../dechargements/dechargement.types';
import { ActivatedRoute, Router } from '@angular/router';
import { Entreposage, Analyse, Cession, Balance, Balayure, Transfert } from '../entreposage.types';
import { DateUtils } from '@ricva-cajou/src/app/core/utils/date-utils';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseConfirmationService } from '@kolab/fuse/src/public-api';
import { Site } from '../../../../administration/operations/site/site.types';
import { environment } from '@ricva-cajou/src/environments/environment';

@Component({
  selector: 'app-detail-entreposage',
  templateUrl: './detail-entreposage.component.html',
  styleUrls: ['./detail-entreposage.component.scss']
})
export class DetailEntreposageComponent implements OnInit {
  entreposage: Entreposage;
  analyse: Analyse = null;
  cession: Cession = null;
  balance: Balance = null;
  balayure: Balayure = null;
  transfert: Transfert = null;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Entreposage', range: null },
    { label: 'Détail', range: 'last' },
  ];
  tabs: string = 'ticket';
  infoAdd: boolean = false;
  decompteAdd: boolean = false;
  analyseAdd: boolean = false;
  cessionAdd: boolean = false;
  balanceAdd: boolean = false;
  balayureAdd: boolean = false;
  transfertAdd: boolean = false;

  infoForm: FormGroup;
  decompteForm: FormGroup;
  analyseForm: FormGroup;
  cessionForm: FormGroup;
  balanceForm: FormGroup;
  balayureForm: FormGroup;
  transfertForm: FormGroup;
  fileForm: FormGroup;

  sites: Site[] = [];
  campagnes: Campagne[] = [];
  entrepots: EntrepotAssigne[] = [];
  provenances: Ville[] = [];

  env: string = environment.server;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private _snackBar: FuseSnackBarService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _EntreposageService: EntreposageService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this._loadData();
    this.entreposage = this._EntreposageService.getEntreposage();
    this.analyse = this.entreposage?.analyses;
    this.cession = this.entreposage?.cession;
    this.balance = this.entreposage?.balances[this.entreposage?.balances?.length - 1];
    this.transfert = this.entreposage?.transferts[this.entreposage?.transferts?.length - 1];
    this.balayure = this.entreposage?.balayures[this.entreposage?.balayures?.length - 1];
    if(!this.entreposage) {
      this.toBack();
      return;
    }
    this._changeDetectorRef.markForCheck();
  }

  ngOnInit() {
    this.editForm();
  }

  editForm() {
    this.infoForm = this._formBuilder.group({
      id: [this.entreposage?.id, Validators.required],
      campagne: [this.entreposage?.campagne?.id, Validators.required],
      dechargement_id: [this.entreposage?.dechargement_id, Validators.required],
      numero_ticket_pese: [this.entreposage?.numero_ticket_pese, Validators.required],
      code_dechargement: [this.entreposage?.code_dechargement, Validators.required],
      date_dechargement: [DateUtils.fromJsonDate(this.entreposage?.date_dechargement), Validators.required],
      numero_lot: [this.entreposage?.numero_lot, Validators.required]
    });
    this.decompteForm = this._formBuilder.group({
      id: [this.entreposage?.id, Validators.required],
      sac_en_stock: [this.entreposage?.sac_en_stock, [Validators.required, Validators.min(0)]],
      reconditionne: [this.entreposage?.reconditionne, [Validators.required, Validators.min(0)]],
      tare_emballage_refraction: [this.entreposage?.tare_emballage_refraction, [Validators.required, Validators.min(0)]],
      poids_net: [this.entreposage?.poids_net, [Validators.required, Validators.min(6), , Validators.max(60)]],
      sacs_decharge: [this.entreposage?.sacs_decharge, [Validators.required, Validators.min(0)]],
      premiere_pesee: [this.entreposage?.premiere_pesee, [Validators.required, Validators.min(0)]],
      deuxieme_pesee: [this.entreposage?.deuxieme_pesee, [Validators.required, Validators.min(0)]]
    });
    this.analyseForm = this._formBuilder.group({
      lot_id: [this.entreposage?.id, Validators.required],
      grainage: [this.analyse?.grainage, [Validators.required, Validators.min(0)]],
      out_turn: [this.analyse?.out_turn, [Validators.required, Validators.min(0)]],
      th: [this.analyse?.th, [Validators.required, Validators.min(0)]]
    });
    this.cessionForm = this._formBuilder.group({
      lot_id: [this.entreposage?.id, Validators.required],
      cedant_id: [this.cession?.cedant_id, Validators.required],
      recevant_id: [this.cession?.recevant_id, Validators.required],
      date_session: [DateUtils.fromJsonDate(this.cession?.date_session), Validators.required]
    });
    this.balanceForm = this._formBuilder.group({
      lot_id: [this.entreposage?.id, Validators.required],
      entrepot_id: [this.balance?.entrepot_id, Validators.required],
      campagne_id: [this.balance?.campagne_id, Validators.required],
      nbre_sacs: [this.balance?.nbre_sacs, [Validators.required, Validators.min(0)]],
      date: [DateUtils.fromJsonDate(this.balance?.date), Validators.required]
    });
    this.balayureForm = this._formBuilder.group({
      lot_id: [this.entreposage?.id, Validators.required],
      entrepot_id: [this.balayure?.entrepot_id, Validators.required],
      campagne_id: [this.balayure?.campagne_id, Validators.required],
      nbre_sacs: [this.balayure?.nbre_sacs, [Validators.required, Validators.min(0)]],
      date: [DateUtils.fromJsonDate(this.balayure?.date), Validators.required]
    });
    this.transfertForm = this._formBuilder.group({
      lot_id: [this.entreposage?.id, Validators.required],
      site_provenance_id: [this.transfert?.site_provenance_id, Validators.required],
      site_destination_id: [this.transfert?.site_destination_id, Validators.required],
      statut_tirage: [this.transfert?.statut_tirage, Validators.required],
      poids_net_mq: [this.transfert?.poids_net_mq, [Validators.required, Validators.min(0)]],
      sac_mq: [this.transfert?.sac_mq, [Validators.required, Validators.min(0)]],
      poids_net_dechet: [this.transfert?.poids_net_dechet, [Validators.required, Validators.min(0)]],
      sac_dechet: [this.transfert?.sac_dechet, [Validators.required, Validators.min(0)]],
      poids_net_poussiere: [this.transfert?.poids_net_poussiere, [Validators.required, Validators.min(0)]],
      total_sac_trie: [this.transfert?.total_sac_trie, [Validators.required, Validators.min(0)]],
      sac_poussiere: [this.transfert?.sac_poussiere, [Validators.required, Validators.min(0)]],
    });
    this.fileForm = this._formBuilder.group({
      file: [null]
    });
  }

  onFileSelected(event: any) {
    const file = event.target?.files[0] ?? null;
    const type = ['application/pdf'];
    const maxSize = 2; //En méga
    if(type.indexOf(file?.type) === -1) {
      this._snackBar._warning("Ce format de fichier n'est pas pris en compte !", null);
      return;
    }
    if(file?.size/1024/1024 > maxSize) {
      this._snackBar._warning("Ce fichier a une taille supérieur à 2MB !", null);
      return;
    }
    this.fileForm.get('file').setValue(file)
  }

  _onDate(champ: string) {
    if(champ === 'date_dechargement' && new Date(this.infoForm.value.date_dechargement) > new Date()) {
      this.infoForm.get('date_dechargement').setValue(null);
      this._snackBar._warning("La date déchargement ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(new Date())), null);
    }
    if(champ === 'date_session' && new Date(this.cessionForm.value.date_session) > new Date()) {
      this.cessionForm.get('date_session').setValue(null);
      this._snackBar._warning("La date de session ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(new Date())), null);
    }
    if(champ === 'date' && new Date(this.balanceForm.value.date) > new Date()) {
      this.balanceForm.get('date').setValue(null);
      this._snackBar._warning("La date de balance ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(new Date())), null);
    }
    if(champ === 'date_balayure' && new Date(this.balayureForm.value.date) > new Date()) {
      this.balayureForm.get('date').setValue(null);
      this._snackBar._warning("La date de balayure ne peut être supérieur au " + (new Intl.DateTimeFormat('fr-FR').format(new Date())), null);
    }
    return;
  }

  _loadData() {
    this.activatedRoute.data.subscribe(({ sites, campagnes, entrepots, provenances }) => {
      this.sites = sites;
      this.campagnes = campagnes;
      this.entrepots = entrepots;
      this.provenances = provenances;
    });
  }

  onTabs(value: string){
    this.tabs = value;
  }

  _infoAdd(value: string) {
    this.infoAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _decompteAdd(value: string) {
    this.decompteAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _analyseAdd(value: string) {
    this.analyseAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _cessionAdd(value: string) {
    this.cessionAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _balanceAdd(value: string) {
    this.balanceAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _balayureAdd(value: string) {
    this.balayureAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  _transfertAdd(value: string) {
    this.transfertAdd = value === 'ADD' ? true : false;
    this._changeDetectorRef.markForCheck();
  }

  // METHODE SUBMIT

  _submitInfo() {
    if(this.infoForm.valid) {
      const data = {...this.decompteForm.getRawValue(), ...this.infoForm.getRawValue()};
      this._EntreposageService.setEntreposage({...data});
      this._EntreposageService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.entreposage = this._EntreposageService.getEntreposage();
            this._infoAdd('CANCEL');
            this._changeDetectorRef.markForCheck();
          }
        }, (error: any) => {})
    }
  }

  _submitDecompte() {
    if(this.decompteForm.valid) {
      const data = {...this.infoForm.getRawValue(), ...this.decompteForm.getRawValue()};
      this._EntreposageService.setEntreposage({...data});
      this._EntreposageService
        .update(data)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202) {
            this.entreposage = this._EntreposageService.getEntreposage();
            this._decompteAdd('CANCEL');
            this._changeDetectorRef.markForCheck();
          }
        }, (error: any) => {})
    }
  }

  _submitAnalyse(type: string) {
    if(type === 'ADD') {
      if(this.analyseForm.valid) {
        const data = this.analyseForm.getRawValue();
        this._EntreposageService
          .createAnalyse(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.analyse = res?.data
              this._EntreposageService.setAnalyse(this.analyse);
              this._analyseAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    } else if(type === 'EDIT') {
      if(this.analyseForm.valid) {
        const data = {...this.analyseForm.getRawValue(), id: this.analyse.id};
        this._EntreposageService.setAnalyse(data);
        this._EntreposageService
          .updateAnalyse(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.analyse = this._EntreposageService.getAnalyse();
              this._analyseAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    }
  }

  _submitCession(type: string) {
    if(type === 'ADD') {
      if(this.cessionForm.valid) {
        const data = this.cessionForm.getRawValue();
        this._EntreposageService
          .createCession(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.cession = res?.data
              this._EntreposageService.setCession(this.cession);
              this._cessionAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    } else if(type === 'EDIT') {
      if(this.cessionForm.valid) {
        const data = {...this.cessionForm.getRawValue(), id: this.cession.id};
        this._EntreposageService.setCession(data);
        this._EntreposageService
          .updateCession(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.cession = this._EntreposageService.getCession();
              this._cessionAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    }
  }

  _submitBalance(type: string) {
    if(type === 'ADD') {
      if(this.balanceForm.valid) {
        const data = this.balanceForm.getRawValue();
        this._EntreposageService
          .createBalance(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.balance = res?.data
              this._EntreposageService.setBalance(this.balance);
              this._balanceAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    } else if(type === 'EDIT') {
      if(this.balanceForm.valid) {
        const data = {...this.balanceForm.getRawValue(), id: this.balance.id};
        this._EntreposageService.setBalance(data);
        this._EntreposageService
          .updateBalance(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.balance = this._EntreposageService.getBalance();
              this._balanceAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    }
  }

  _submitBalayure(type: string) {
    if(type === 'ADD') {
      if(this.balayureForm.valid) {
        const data = this.balayureForm.getRawValue();
        console.log(data);
        this._EntreposageService
          .createSweep(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.balayure = res?.data
              this._EntreposageService.setBalayure(this.balayure);
              this._balayureAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    } else if(type === 'EDIT') {
      if(this.balayureForm.valid) {
        const data = {...this.balayureForm.getRawValue(), id: this.balayure.id};
        this._EntreposageService.setBalayure(data);
        this._EntreposageService
          .updateSweep(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.balayure = this._EntreposageService.getBalayure();
              this._balayureAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    }
  }

  _submitTransfert(type: string) {
    if(type === 'ADD') {
      if(this.transfertForm.valid) {
        const data = this.transfertForm.getRawValue();
        this._EntreposageService
          .createTransfert(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.transfert = res?.data
              this._EntreposageService.setTransfert(this.transfert);
              this._transfertAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    } else if(type === 'EDIT') {
      if(this.transfertForm.valid) {
        const data = {...this.transfertForm.getRawValue(), id: this.transfert.id};
        this._EntreposageService.setTransfert(data);
        this._EntreposageService
          .updateTransfert(data)
          .subscribe((res: any) => {
            if(res?.state >= 200 && res?.state <= 202) {
              this.transfert = this._EntreposageService.getTransfert();
              this._transfertAdd('CANCEL');
              this._changeDetectorRef.markForCheck();
            }
          }, (error: any) => {})
      }
    }
  }

  // METHODE SUBMIT

  _delete(Id: string) {
    if (Id === '') {
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }

    this._modalDelete().afterClosed().subscribe((value: any) => {
      if(value === 'confirmed') {
        this._EntreposageService
        .delete(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this._snackBar._success(res?.message, null);
            this.toBack();
            return;
          }
        }, (error: any) => {})
      }
    });
  }

  _deleteAnalyse(Id: string) {
    if (Id === '') {
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }

    this._modalDelete().afterClosed().subscribe((value: any) => {
      if(value === 'confirmed') {
        this._EntreposageService
        .deleteAnalyse(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this._EntreposageService.setAnalyse(null);
            this.analyse = this._EntreposageService.getAnalyse();
          }
        }, (error: any) => {})
      }
    });
  }

  _deleteCession(Id: string) {
    if (Id === '') {
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }

    this._modalDelete().afterClosed().subscribe((value: any) => {
      if(value === 'confirmed') {
        this._EntreposageService
        .deleteCession(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this._EntreposageService.setCession(null);
            this.cession = this._EntreposageService.getCession();
          }
        }, (error: any) => {})
      }
    });
  }

  _deleteBalance(Id: string) {
    if (Id === '') {
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }

    this._modalDelete().afterClosed().subscribe((value: any) => {
      if(value === 'confirmed') {
        this._EntreposageService
        .deleteBalance(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this._EntreposageService.setBalance(null);
            this.balance = this._EntreposageService.getBalance();
          }
        }, (error: any) => {})
      }
    });
  }

  _deleteBalayure(Id: string) {
    if (Id === '') {
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }

    this._modalDelete().afterClosed().subscribe((value: any) => {
      if(value === 'confirmed') {
        this._EntreposageService
        .deleteBalayure(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this._EntreposageService.setBalayure(null);
            this.balayure = this._EntreposageService.getBalayure();
          }
        }, (error: any) => {})
      }
    });
  }

  _deleteTransfert(Id: string) {
    if (Id === '') {
      this._snackBar._warning("Identifiant introuvable !", null);
      return;
    }

    this._modalDelete().afterClosed().subscribe((value: any) => {
      if(value === 'confirmed') {
        this._EntreposageService
        .deleteTransfert(Id)
        .subscribe((res: any) => {
          if(res?.state >= 200 && res?.state <= 202){
            this._EntreposageService.setTransfert(null);
            this.transfert = this._EntreposageService.getTransfert();
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
    this.router.navigate(['/operations/gestion-lots/entreposage/list']);
  }

}
