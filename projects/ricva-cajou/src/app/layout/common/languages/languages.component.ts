import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import {
  FuseNavigationService,
  FuseVerticalNavigationComponent,
} from 'projects/ricva-cajou/src/@fuse/components/navigation';
import { FuseIndexedDbService } from '@kolab/fuse/src/public-api';
import { Setting } from '@kolab/fuse/src/lib/services/indexed-db/indexed-db.types';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'languages',
})
export class LanguagesComponent implements OnInit, OnDestroy {
  availableLangs: AvailableLangs | any;
  activeLang: string | any;
  flagCodes: any;
  setting: Setting = { scheme: `light`, layout: `classic`, lang: `fr`, status: `onligne` };

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseNavigationService: FuseNavigationService,
    private _translocoService: TranslocoService,
    private _fuseIndexedDbService: FuseIndexedDbService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the available languages from transloco
    this.availableLangs = this._translocoService.getAvailableLangs();

    // Subscribe to language changes
    this._translocoService.langChanges$.subscribe((activeLang) => {
      // Get the active lang
      this.activeLang = activeLang;

      // // Update the navigation
      this._updateNavigation(activeLang);
      this._fuseIndexedDbService.settingCount$.subscribe((count: number) => {
        if(count === 1){
          this._fuseIndexedDbService.setting$.subscribe((setting: Setting) => {
            this._fuseIndexedDbService.setting = { ...setting, lang: activeLang };
          });
        }
      });
    });

    // Set the country iso codes for languages for flags
    this.flagCodes = {
      en: 'us',
      // tr: 'tr',
      fr: 'fr',
    };
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Set the active lang
   *
   * @param lang
   */
  setActiveLang(lang: string): void {
    // Set the active lang
    this._translocoService.setActiveLang(lang);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the navigation
   *
   * @param lang
   * @private
   */
  private _updateNavigation(lang: string): void {
    // For the demonstration purposes, we will only update the Dashboard names
    // from the navigation but you can do a full swap and change the entire
    // navigation data.
    //
    // You can import the data from a file or request it from your backend,
    // it's up to you.

    // Get the component -> navigation data -> item
    const navComponent =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
        'mainNavigation'
      );

    // Return if the navigation component does not exist
    if (!navComponent) {
      return null;
    }
    // Get the flat navigation data
    const navigation = navComponent.navigation;

    // First navigation box
    const boxDashboardItem = this._fuseNavigationService.getItem(
      'dashboards',
      navigation
    );
    if (boxDashboardItem) {
      this._translocoService
        .selectTranslate('box-board')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          boxDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });

      this._translocoService
        .selectTranslate('box-board-sub')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          boxDashboardItem.subtitle = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }
    // sub navigation box

    // Get the Project dashboard item and update its title
    const projectDashboardItem = this._fuseNavigationService.getItem(
      'dashboards.project',
      navigation
    );
    if (projectDashboardItem) {
      this._translocoService
        .selectTranslate('project')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          projectDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // Get the Analytics dashboard item and update its title
    const analyticsDashboardItem = this._fuseNavigationService.getItem(
      'dashboards.analytic',
      navigation
    );
    if (analyticsDashboardItem) {
      this._translocoService
        .selectTranslate('analytic')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          analyticsDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the comptabilite item and update its title
    const comptabiliteDashboardItem = this._fuseNavigationService.getItem(
      'dashboards.comptabilite',
      navigation
    );
    if (comptabiliteDashboardItem) {
      this._translocoService
        .selectTranslate('comptabilite')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          comptabiliteDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the administration item and update its title
    const administrationDashboardItem = this._fuseNavigationService.getItem(
      'dashboards.administration',
      navigation
    );

    if (administrationDashboardItem) {
      this._translocoService
        .selectTranslate('administration')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          administrationDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the supervisor item and update its title
    const superviseurDashboardItem = this._fuseNavigationService.getItem(
      'dashboards.superviseur',
      navigation
    );

    if (superviseurDashboardItem) {
      this._translocoService
        .selectTranslate('superviseur')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          superviseurDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the application subtitle item and update its title
    const applicationItem = this._fuseNavigationService.getItem(
      'apps',
      navigation
    );
    if (applicationItem) {
      this._translocoService
        .selectTranslate('gestion-applicative')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          applicationItem.subtitle = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the administration item for the apps section and update its title
    const administrationAppDashboardItem = this._fuseNavigationService.getItem(
      'apps.administration',
      navigation
    );

    if (administrationAppDashboardItem) {
      this._translocoService
        .selectTranslate('administration')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          administrationAppDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the comptabilite item for the apps section and update its title
    const comptabiliteAppDashboardItem = this._fuseNavigationService.getItem(
      'apps.comptabilite',
      navigation
    );

    if (comptabiliteAppDashboardItem) {
      this._translocoService
        .selectTranslate('comptabilite')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          comptabiliteAppDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the operation item for the apps section and update its title
    const operationAppDashboardItem = this._fuseNavigationService.getItem(
      'apps.operations',
      navigation
    );

    if (operationAppDashboardItem) {
      this._translocoService
        .selectTranslate('operations')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          operationAppDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the finance item for the apps section and update its title
    const financeAppDashboardItem = this._fuseNavigationService.getItem(
      'apps.finances',
      navigation
    );

    if (financeAppDashboardItem) {
      this._translocoService
        .selectTranslate('finances')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          financeAppDashboardItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the suivi des engagements item for the apps section and update its title
    const suiviEngagementItem = this._fuseNavigationService.getItem(
      'apps.finances.statistique.suivis-engagement',
      navigation
    );
    if (suiviEngagementItem) {
      this._translocoService
        .selectTranslate('suivi-engagement')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          suiviEngagementItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the conteneur item for the apps section and update its title
    const conteneurItem = this._fuseNavigationService.getItem(
      'apps.operations.exports.parking-list.conteneurs',
      navigation
    );
    if (conteneurItem) {
      this._translocoService
        .selectTranslate('conteneurs')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          conteneurItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the charge item from the charge operationnelle section and update its title
    const chargeOperationnelleItem = this._fuseNavigationService.getItem(
      'apps.comptabilite.charge-operationnelle.charges',
      navigation
    );
    if (chargeOperationnelleItem) {
      this._translocoService
        .selectTranslate('charges')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          chargeOperationnelleItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the charge item from the charge diverse section and update its title
    const chargeDiverseItem = this._fuseNavigationService.getItem(
      'apps.comptabilite.charge-diverse.charges',
      navigation
    );

    if (chargeDiverseItem) {
      this._translocoService
        .selectTranslate('charges')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          chargeDiverseItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the reglement item from the charge diverse section and update its title
    const reglementDiverseItem = this._fuseNavigationService.getItem(
      'apps.comptabilite.charge-diverse.reglements',
      navigation
    );
    if (reglementDiverseItem) {
      this._translocoService
        .selectTranslate('reglements')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          reglementDiverseItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the compte de resultat item  and update its title
    const compteDeResultatItem = this._fuseNavigationService.getItem(
      'apps.comptabilite.reporting.compte-resultats',
      navigation
    );
    if (compteDeResultatItem) {
      this._translocoService
        .selectTranslate('compte-de-resultats')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          compteDeResultatItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the etat charge item  and update its title
    const etatChargetem = this._fuseNavigationService.getItem(
      'apps.comptabilite.reporting.etat-charges',
      navigation
    );
    if (etatChargetem) {
      this._translocoService
        .selectTranslate('etat-charge')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          etatChargetem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the finance item from the administration section and update its title
    const financeAdministrationItem = this._fuseNavigationService.getItem(
      'apps.administration.finances.finance',
      navigation
    );

    if (financeAdministrationItem) {
      this._translocoService
        .selectTranslate('finances')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          financeAdministrationItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the banque item from the administration section and update its title
    const banqueAdministrationItem = this._fuseNavigationService.getItem(
      'apps.administration.finances.banque',
      navigation
    );
    if (banqueAdministrationItem) {
      this._translocoService
        .selectTranslate('banque')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          banqueAdministrationItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // get the reglement item from the charge operationnelle section and update its title
    const reglementOperationnelleItem = this._fuseNavigationService.getItem(
      'apps.comptabilite.charge-operationnelle.reglements',
      navigation
    );

    if (reglementOperationnelleItem) {
      this._translocoService
        .selectTranslate('reglements')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          reglementOperationnelleItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    /** Apps:operations children translate */
    // gestion des lots
    const gestionLotAppOperationsSubItem = this._fuseNavigationService.getItem(
      'apps.operations.gestion',
      navigation
    );

    if (gestionLotAppOperationsSubItem) {
      this._translocoService
        .selectTranslate('gestion-lots')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          gestionLotAppOperationsSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }
    // export
    const exportAppOperationsSubItem = this._fuseNavigationService.getItem(
      'apps.operations.exports',
      navigation
    );

    if (exportAppOperationsSubItem) {
      this._translocoService
        .selectTranslate('exports')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          exportAppOperationsSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //statistique
    const statisticsAppOperationsSubItem = this._fuseNavigationService.getItem(
      'apps.operations.statistiques',
      navigation
    );

    if (statisticsAppOperationsSubItem) {
      this._translocoService
        .selectTranslate('statistique')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          statisticsAppOperationsSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    /** Apps:Finance children translate  */

    // compte
    const compteAppFinanceSubItem = this._fuseNavigationService.getItem(
      'apps.finances.compte',
      navigation
    );

    if (compteAppFinanceSubItem) {
      this._translocoService
        .selectTranslate('compte')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          compteAppFinanceSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //suivi des engagements
    const suiviEngagementAppFinanceSubItem =
      this._fuseNavigationService.getItem(
        'apps.finances.suivis-engagements',
        navigation
      );

    if (suiviEngagementAppFinanceSubItem) {
      this._translocoService
        .selectTranslate('suivi-engagements')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          suiviEngagementAppFinanceSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //nantissements
    const nantissementAppFinanceSubItem = this._fuseNavigationService.getItem(
      'apps.finances.nantissements',
      navigation
    );

    if (nantissementAppFinanceSubItem) {
      this._translocoService
        .selectTranslate('nantissements')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          nantissementAppFinanceSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //facture
    const factureAppFinanceSubItem = this._fuseNavigationService.getItem(
      'apps.finances.facturations',
      navigation
    );

    if (factureAppFinanceSubItem) {
      this._translocoService
        .selectTranslate('facture')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          factureAppFinanceSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Avance sur contrat
    const avanceSurContratAppFinanceSubItem =
      this._fuseNavigationService.getItem(
        'apps.finances.avance-contrat',
        navigation
      );

    if (avanceSurContratAppFinanceSubItem) {
      this._translocoService
        .selectTranslate('avance-sur-contrat')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          avanceSurContratAppFinanceSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //controle a arrive
    const controleArriveAppFinanceSubItem = this._fuseNavigationService.getItem(
      'apps.finances.controle-arrive',
      navigation
    );

    if (controleArriveAppFinanceSubItem) {
      this._translocoService
        .selectTranslate('controle-arrive')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          controleArriveAppFinanceSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //contrat
    const contratAppFinanceSubItem = this._fuseNavigationService.getItem(
      'apps.finances.contrat',
      navigation
    );

    if (contratAppFinanceSubItem) {
      this._translocoService
        .selectTranslate('contrat')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          contratAppFinanceSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //statistique
    const statistiqueAppFinanceSubItem = this._fuseNavigationService.getItem(
      'apps.finances.statistique',
      navigation
    );

    if (statistiqueAppFinanceSubItem) {
      this._translocoService
        .selectTranslate('statistique')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          statistiqueAppFinanceSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    /** end Apps:Finance children translate  */

    /** Apps: comptabilite children translate  */
    const chargeOperationnelleAppComptabiliteSubItem =
      this._fuseNavigationService.getItem(
        'apps.comptabilite.charge-operationnelle',
        navigation
      );

    if (chargeOperationnelleAppComptabiliteSubItem) {
      this._translocoService
        .selectTranslate('charge-operationnelle')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          chargeOperationnelleAppComptabiliteSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    // charge diverse
    const chargeDiverseAppComptabiliteSubItem =
      this._fuseNavigationService.getItem(
        'apps.comptabilite.charge-diverse',
        navigation
      );
    if (chargeDiverseAppComptabiliteSubItem) {
      this._translocoService
        .selectTranslate('charge-diverse')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          chargeDiverseAppComptabiliteSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    /** end: comptabilite children translate  */

    /** apps: administration children translate */
    //operations
    const operationAdministrationSubItem = this._fuseNavigationService.getItem(
      'apps.administration.operations',
      navigation
    );
    if (operationAdministrationSubItem) {
      this._translocoService
        .selectTranslate('operations')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          operationAdministrationSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //applicatives
    const applicativeAdministrationSubItem =
      this._fuseNavigationService.getItem(
        'apps.administration.applicatives',
        navigation
      );
    if (applicativeAdministrationSubItem) {
      this._translocoService
        .selectTranslate('applicative')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          applicativeAdministrationSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //finance
    const financeAdministrationSubItem = this._fuseNavigationService.getItem(
      'apps.administration.finances',
      navigation
    );

    if (financeAdministrationSubItem) {
      this._translocoService
        .selectTranslate('finances')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          financeAdministrationSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //comptabilite
    const comptabiliteAdministrationSubItem =
      this._fuseNavigationService.getItem(
        'apps.administration.comptabilites',
        navigation
      );

    if (comptabiliteAdministrationSubItem) {
      this._translocoService
        .selectTranslate('comptabilite')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          comptabiliteAdministrationSubItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }
    /** end apps: administration children translate */

    //dechargement Get the dechargement item and update its title
    const dechargementItem = this._fuseNavigationService.getItem(
      'apps.operations.gestion.dechargements',
      navigation
    );
    if (dechargementItem) {
      this._translocoService
        .selectTranslate('dechargement')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          dechargementItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the entreposage item and update its title
    const entreposageItem = this._fuseNavigationService.getItem(
      'apps.operations.gestion.entreposage',
      navigation
    );
    if (entreposageItem) {
      this._translocoService
        .selectTranslate('entreposage')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          entreposageItem.title = translation;

          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the empotage item and update its title
    const empotageItem = this._fuseNavigationService.getItem(
      'apps.operations.gestion.empotage',
      navigation
    );

    if (empotageItem) {
      this._translocoService
        .selectTranslate('empotage')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          empotageItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }
    //Get the plan empotage item and update its title
    const planEmpotageItem = this._fuseNavigationService.getItem(
      'apps.operations.gestion.empotage.plan-empotage',
      navigation
    );

    if (planEmpotageItem) {
      this._translocoService
        .selectTranslate('plan-empotage')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          planEmpotageItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the execution item and update its title
    const executionItem = this._fuseNavigationService.getItem(
      'apps.operations.gestion.empotage.execution',
      navigation
    );

    if (executionItem) {
      this._translocoService
        .selectTranslate('execution')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          executionItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the inventaire item and update its title
    const inventaireItem = this._fuseNavigationService.getItem(
      'apps.operations.statistiques.inventaire',
      navigation
    );

    if (inventaireItem) {
      this._translocoService
        .selectTranslate('inventaire')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          inventaireItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the rapport exportateur item and update its title
    const rapportExportateurItem = this._fuseNavigationService.getItem(
      'apps.operations.statistiques.rapport-exportateur',
      navigation
    );

    if (rapportExportateurItem) {
      this._translocoService
        .selectTranslate('rapport-exportateur')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          rapportExportateurItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the generale item and update its title
    const generaleItem = this._fuseNavigationService.getItem(
      'apps.operations.statistiques.generale',
      navigation
    );

    if (generaleItem) {
      this._translocoService
        .selectTranslate('generale')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          generaleItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the prefinancement fournisseur  item and update its title
    const prefinancementFournisseurItem = this._fuseNavigationService.getItem(
      'apps.finances.suivis-engagements.prefinancement-fournisseur',
      navigation
    );

    if (prefinancementFournisseurItem) {
      this._translocoService
        .selectTranslate('prefinancement-fournisseur')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          prefinancementFournisseurItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the prefinancement groupement item and update its title

    //Get the demande de nantissement item and update its title
    const demandeNantissementItem = this._fuseNavigationService.getItem(
      'apps.finances.nantissements.demande-nantissement',
      navigation
    );
    if (demandeNantissementItem) {
      this._translocoService
        .selectTranslate('demande-nantissement')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          demandeNantissementItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the lettre de tiers detention item and update its title
    const lettreTiersDetentionItem = this._fuseNavigationService.getItem(
      'apps.finances.nantissements.lettre-tiers-detention',
      navigation
    );

    if (lettreTiersDetentionItem) {
      this._translocoService
        .selectTranslate('lettre-de-tiers-detention')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          lettreTiersDetentionItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the facture item inside avant sur contrat section and update its title
    const factureSurContratItem = this._fuseNavigationService.getItem(
      'apps.finances.avance-contrat.facture',
      navigation
    );

    if (factureSurContratItem) {
      this._translocoService
        .selectTranslate('facture')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          factureSurContratItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the reglement  facture item inside avant sur contrat section and update its title
    const reglementFactureSurContratItem = this._fuseNavigationService.getItem(
      'apps.finances.avance-contrat.reglement-facture',
      navigation
    );

    if (reglementFactureSurContratItem) {
      this._translocoService
        .selectTranslate('reglement-facture')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          reglementFactureSurContratItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the sous contrat item inside finance section and update its title
    const sousContratFinanceItem = this._fuseNavigationService.getItem(
      'apps.finances.contrat.sous-contrat',
      navigation
    );
    if (sousContratFinanceItem) {
      this._translocoService
        .selectTranslate('sous-contrat')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          sousContratFinanceItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the suivi contrat  item inside finance section and update its title
    const suiviContratItem = this._fuseNavigationService.getItem(
      'apps.finances.contrat.suivi-contrat',
      navigation
    );

    if (suiviContratItem) {
      this._translocoService
        .selectTranslate('suivi-contrat')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          suiviContratItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the facture item inside the finance section and update its title
    const factureChildItem = this._fuseNavigationService.getItem(
      'apps.finances.facturations.facture',
      navigation
    );

    if (factureChildItem) {
      this._translocoService
        .selectTranslate('facture')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          factureChildItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }

    //Get the reglement facture item inside the finance section and update its title
    const reglementFactureChildItem = this._fuseNavigationService.getItem(
      'apps.finances.facturations.reglement-facture',
      navigation
    );

    if (reglementFactureChildItem) {
      this._translocoService
        .selectTranslate('reglement-facture')
        .pipe(take(1))
        .subscribe((translation) => {
          // Set the title
          reglementFactureChildItem.title = translation;
          // Refresh the navigation component
          navComponent.refresh();
        });
    }
  }
}
