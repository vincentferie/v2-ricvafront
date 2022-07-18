/* tslint:disable:max-line-length */

import { FuseNavigationItem } from 'projects/ricva-cajou/src/@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'box-board',
    subtitle: '',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [
      {
        id: 'dashboards.project',
        title: 'project',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-check',
        link: '/dashboards/operations',
      },
      {
        id: 'dashboards.analytic',
        title: 'analytic',
        type: 'basic',
        icon: 'heroicons_outline:cash',
        link: '/dashboards/finances',
      },
      {
        id: 'dashboards.comptabilite',
        title: 'Comptabilité',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/dashboards/comptabilite',
      },

      {
        id: 'dashboards.administration',
        title: 'Administration',
        type: 'basic',
        icon: 'mat_outline:menu',
        link: '/dashboards/administration',
      },
      {
        id: 'dashboards.superviseur',
        title: 'Superviseur',
        type: 'basic',
        icon: 'mat_outline:supervised_user_circle',
        link: '/dashboards/superviseur',
      },
    ],
  },

  {
    id: 'divider-1',
    type: 'divider',
  },

  {
    id: 'apps',
    title: 'Applications',
    subtitle: 'Gestion applicative',
    type: 'group',
    icon: 'heroicons_outline:document',
    children: [
      // Operations
      {
        id: 'apps.operations',
        title: 'Operations',
        type: 'collapsable',
        icon: 'ricva_icons:nav_operation',
        children: [
          {
            id: 'apps.operations.gestion',
            title: 'Gestion des lots',
            type: 'collapsable',
            children: [
              {
                id: 'apps.operations.gestion.dechargements',
                title: 'Dechargements',
                type: 'basic',
                link: '/operations/gestion-lots/dechargements',
              },
              {
                id: 'apps.operations.gestion-lots.entreposage',
                title: 'Entreposage',
                type: 'basic',
                link: '/operations/gestion-lots/entreposage',
              },
              {
                id: 'apps.operations.gestion-lots.validation',
                title: 'Validation lots',
                type: 'basic',
                link: '/operations/gestion-lots/validation',
              },
              {
                id: 'apps.operations.gestion-lots.empotage',
                title: 'Empotage',
                type: 'collapsable',
                children: [
                  {
                    id: 'apps.operations.gestion.empotage.plan-empotage',
                    title: "Plan d'empotage",
                    type: 'basic',
                    link: '/operations/gestion-lots/empotage/plan-empotage',
                  },
                  {
                    id: 'apps.operations.gestion.empotage.execution',
                    title: 'Execution',
                    type: 'basic',
                    link: '/operations/gestion-lots/empotage/execution',
                  },
                ],
              },
            ],
          },

          //exports
          {
            id: 'apps.operations.exports',
            title: 'Exports',
            type: 'collapsable',
            children: [
              {
                id: 'apps.operations.exports.parking-list',
                title: 'Parking List',
                type: 'collapsable',
                children: [
                  {
                    id: 'apps.operations.exports.parking-list.bookings',
                    title: 'Bookings',
                    type: 'basic',
                    link: '/operations/exports/parking-list/bookings',
                  },
                  {
                    id: 'apps.operations.exports.parking-list.conteneurs',
                    title: 'Conteneurs',
                    type: 'basic',
                    link: '/operations/exports/parking-list/conteneurs',
                  },
                ],
              },
              {
                id: 'apps.operations.exports.bill-of-landing',
                title: 'Bill of landing',
                type: 'basic',
                link: '/operations/exports/bill-of-landing',
              },
            ],
          },
          //statistiques
          {
            id: 'apps.operations.statistiques',
            title: 'Statistiques',
            type: 'collapsable',
            children: [
              {
                id: 'apps.operations.statistiques.inventaire',
                title: 'Inventaire',
                type: 'basic',
                link: '/operations/statistiques/inventaire',
              },
              {
                id: 'apps.operations.statistiques.rapport-exportateur',
                title: 'Rapport Exportateur',
                type: 'basic',
                link: '/operations/statistiques/rapport-exportateur',
              },
              {
                id: 'apps.operations.statistiques.generale',
                title: 'Generale',
                type: 'basic',
                link: '/operations/statistiques/generale',
              },
            ],
          },
        ],
      },

      //Finances
      {
        id: 'apps.finances',
        title: 'Finances',
        type: 'collapsable',
        icon: 'ricva_icons:nav_finance',
        children: [
          {
            id: 'apps.finances.compte',
            title: 'Compte',
            type: 'basic',
            link: '/finances/comptes',
          },
          //finances/suivis-des-engagements
          {
            id: 'apps.finances.suivis-engagements',
            title: 'Suivi des engagements',
            type: 'collapsable',
            children: [
              {
                id: 'apps.finances.suivis-engagements.prefinancement-fournisseur',
                title: 'Prefinancement fournisseur',
                type: 'basic',
                link: '/finances/suivis-engagements/prefinancement-fournisseur',
              },
              {
                id: 'apps.finances.suivis-engagements.prefinancement-groupement',
                title: 'Prefinancement groupement',
                type: 'basic',
                link: '/finances/suivis-engagements/prefinancement-groupement',
              },
            ],
          },
          //finances/nantissements
          {
            id: 'apps.finances.nantissements',
            title: 'Nantissements',
            type: 'collapsable',
            children: [
              {
                id: 'apps.finances.nantissements.demande-nantissement',
                title: 'Demande de nantissement',
                type: 'basic',
                link: '/finances/nantissements/demande-nantissement',
              },
              {
                id: 'apps.finances.nantissements.lettre-tiers-detention',
                title: 'Lettre de tiers detention',
                type: 'basic',
                link: '/finances/nantissements/lettre-tiers-detention',
              },
            ],
          },

          //finances/facturactions
          {
            id: 'apps.finances.facturations',
            title: 'Facture',
            type: 'collapsable',
            children: [
              {
                id: 'apps.finances.facturations.facture',
                title: 'Facture',
                type: 'basic',
                link: '/finances/facturations/facture',
              },
              {
                id: 'apps.finances.facturations.reglement-facture',
                title: 'Reglement facture',
                type: 'basic',
                link: '/finances/facturations/reglement-facture',
              },
            ],
          },

          //finances/avance-contrat
          {
            id: 'apps.finances.avance-contrat',
            title: 'Avance sur contrat',
            type: 'collapsable',
            children: [
              {
                id: 'apps.finances.avance-contrat.facture',
                title: 'Facture',
                type: 'basic',
                link: '/finances/avance-contrat/facture',
              },
              {
                id: 'apps.finances.avance-contrat.reglement-facture',
                title: 'Reglement facture',
                type: 'basic',
                link: '/finances/avance-contrat/reglement-facture',
              },
            ],
          },

          //finances/controle-arrive
          {
            id: 'apps.finances.controle-arrive',
            title: "Contrôle à l'arrivé",
            type: 'basic',
            link: '/finances/controle-arrive',
          },

          //finances/contrat
          {
            id: 'apps.finances.contrat',
            title: 'Contrat',
            type: 'collapsable',
            children: [
              {
                id: 'apps.finances.contrat.contrat',
                title: 'Contrat',
                type: 'basic',
                link: '/finances/contrat/contrat',
              },
              {
                id: 'apps.finances.contrat.sous-contrat',
                title: 'Sous contrat',
                type: 'basic',
                link: '/finances/contrat/sous-contrat',
              },
              {
                id: 'apps.finances.contrat.suivi-contrat',
                title: 'Suivi contrat',
                type: 'basic',
                link: '/finances/contrat/suivi-contrat',
              },
            ],
          },

          //finances/statistiques
          {
            id: 'apps.finances.statistique',
            title: 'Statistique',
            type: 'collapsable',
            children: [
              {
                id: 'apps.finances.statistique.suivis-engagement',
                title: 'Suivis des engagements',
                type: 'basic',
                link: '/finances/statistique/suivis-engagement',
              },
            ],
          },
        ],
      },

      //Comptabilite
      {
        id: 'apps.comptabilite',
        title: 'Compabilite',
        type: 'collapsable',
        icon: 'heroicons_outline:calculator',
        children: [
          {
            id: 'apps.comptabilite.charge-operationnelle',
            title: 'Charge Operationnelle',
            type: 'collapsable',
            children: [
              {
                id: 'apps.comptabilite.charge-operationnelle.charges',
                title: 'Charges',
                type: 'basic',
                link: '/comptabilite/charge-operationnelle/charges',
              },
              {
                id: 'apps.comptabilite.charge-operationnelle.reglements',
                title: 'Reglements',
                type: 'basic',
                link: '/comptabilite/charge-operationnelle/reglements',
              },
            ],
          },
          // charge diverse
          {
            id: 'apps.comptabilite.charge-diverse',
            title: 'Charge Diverse',
            type: 'collapsable',
            children: [
              {
                id: 'apps.comptabilite.charge-diverse.charges',
                title: 'Charges',
                type: 'basic',
                link: '/comptabilite/charge-diverse/charges',
              },
              {
                id: 'apps.comptabilite.charge-diverse.reglements',
                title: 'Reglements',
                type: 'basic',
                link: '/comptabilite/charge-diverse/reglements',
              },
            ],
          },

          //reporting
          {
            id: 'apps.comptabilite.reporting',
            title: 'Reporting',
            type: 'collapsable',
            children: [
              {
                id: 'apps.comptabilite.reporting.compte-resultats',
                title: 'Compte de résultats',
                type: 'basic',
                link: '/comptabilite/reporting/compte-resultats',
              },
              {
                id: 'apps.comptabilite.reporting.etat-charges',
                title: 'Etats Charges',
                type: 'basic',
                link: '/comptabilite/reporting/etats-charges',
              },
            ],
          },
        ],
      },

      //Administration
      {
        id: 'apps.administration',
        title: 'Administration',
        type: 'collapsable',
        icon: 'ricva_icons:nav_administration',
        children: [
          {
            id: 'apps.administration.operations',
            title: 'Operations',
            type: 'basic',
            link: '/administration/operations',
          },
          {
            id: 'apps.administration.applicatives',
            title: 'Applicatives',
            type: 'basic',
            link: '/administration/applicatives',
          },
          {
            id: 'apps.administration.finances',
            title: 'Finances',
            type: 'collapsable',
            children: [
              {
                id: 'apps.administration.finances.finance',
                title: 'Finance',
                type: 'basic',
                link: '/administration/finances/finance',
              },
              {
                id: 'apps.administration.finances.banque',
                title: 'Banque',
                type: 'basic',
                link: '/administration/finances/banque',
              },
            ],
          },

          {
            id: 'apps.administration.comptabilites',
            title: 'Comptabilités',
            type: 'basic',
            link: '/administration/comptabilites',
          },
        ],
      },
    ],
  },
];

export const compactNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Reporting',
    tooltip: 'Dashboards',
    type: 'aside',
    icon: 'heroicons_outline:home',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },

  {
    id: 'apps',
    title: 'Applications',
    tooltip: 'Applications',
    type: 'aside',
    icon: 'heroicons_outline:document-duplicate',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
export const futuristicNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Reporting',
    type: 'group',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },

  {
    id: 'others',
    title: 'Applications',
    type: 'group',
  },

  {
    id: 'apps',
    title: 'Applications',
    type: 'aside',
    icon: 'heroicons_outline:document-duplicate',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
export const horizontalNavigation: FuseNavigationItem[] = [
  {
    id: 'dashboards',
    title: 'Reporting',
    type: 'group',
    icon: 'heroicons_outline:home',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },

  {
    id: 'apps',
    title: 'Applications',
    type: 'group',
    icon: 'heroicons_outline:document-duplicate',
    children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
  },
];
