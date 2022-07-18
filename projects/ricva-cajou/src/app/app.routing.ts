import { Route } from '@angular/router';
import { InitialDataResolver } from './app.resolvers';
import { ComoditiesGuard } from './core/auth/guards/comodities.guard';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  // Redirect empty path to 'dashboards/project'
  { path: '', pathMatch: 'full', redirectTo: 'dashboards/operations' },

  // Redirect signed in user to the 'dashboards/project'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {
    path: 'sign-out-redirect',
    // pathMatch: 'full',
    // redirectTo: 'dashboards/operations',
    component: LayoutComponent,
    data: {
      layout: 'empty',
      externalUrl: localStorage.getItem('originUrl')
    },
    resolve: {
      url: 'externalUrlRedirectResolver'
    },
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () =>
          import('./modules/auth/sign-out/sign-out.module').then(
            (m) => m.AuthSignOutModule
          ),
      },
      {
        path: 'unlock-session',
        loadChildren: () =>
          import('./modules/auth/unlock-session/unlock-session.module').then(
            (m) => m.AuthUnlockSessionModule
          ),
      },
    ],
  },

  // Admin routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    // canActivate: [AuthGuard, ComoditiesGuard],
    // canActivateChild: [AuthGuard, ComoditiesGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver
    },
    children: [
      // Dashboards
      {
        path: 'dashboards',
        children: [
          {
            path: 'operations',
            loadChildren: () =>
              import('./modules/admin/dashboards/project/project.module').then(
                (m) => m.ProjectModule
              ),
          },
          {
            path: 'finances',
            loadChildren: () =>
              import(
                './modules/admin/dashboards/analytics/analytics.module'
              ).then((m) => m.AnalyticsModule),
          },
          {
            path: 'comptabilite',
            loadChildren: () =>
              import('./modules/admin/dashboards/finance/finance.module').then(
                (m) => m.FinanceModule
              ),
          },
          {
            path: 'administration',
            loadChildren: () =>
              import('./modules/admin/dashboards/crypto/crypto.module').then(
                (m) => m.CryptoModule
              ),
          },
          {
            path: 'superviseur',
            loadChildren: () =>
              import(
                './modules/admin/dashboards/superviseur/superviseur.module'
              ).then((m) => m.SuperviseurModule),
          },
        ],
      },

      //Operations
      {
        path: 'operations',
        children: [
          //operations/gestions
          {
            path: 'gestion-lots',
            children: [
              {
                path: 'dechargements',
                loadChildren: () =>
                  import(
                    './modules/admin/operations/gestion/dechargements/dechargements.module'
                  ).then((m) => m.DechargementsModule),
              },
              {
                path: 'entreposage',
                loadChildren: () =>
                  import(
                    './modules/admin/operations/gestion/entreposage/entreposage.module'
                  ).then((m) => m.EntreposageModule),
              },
              {
                path: 'validation',
                loadChildren: () =>
                  import(
                    './modules/admin/operations/gestion/validation/validation.module'
                  ).then((m) => m.ValidationModule),
              },
              {
                path: 'empotage',
                children: [
                  {
                    path: 'plan-empotage',
                    loadChildren: () =>
                      import(
                        './modules/admin/operations/gestion/empotage/plan-emtopage/plan-emtopage.module'
                      ).then((m) => m.PlanEmtopageModule),
                  },
                  {
                    path: 'execution',
                    loadChildren: () =>
                      import(
                        './modules/admin/operations/gestion/empotage/execution/execution.module'
                      ).then((m) => m.ExecutionModule),
                  },
                ],
              },
            ],
          },

          //operations/exports
          {
            path: 'exports',
            children: [
              //exports/parking-list
              {
                path: 'parking-list',
                children: [
                  {
                    path: 'bookings',
                    loadChildren: () =>
                      import(
                        './modules/admin/operations/exports/parking-list/bookings/bookings.module'
                      ).then((m) => m.BookingsModule),
                  },
                  {
                    path: 'conteneurs',
                    loadChildren: () =>
                      import(
                        './modules/admin/operations/exports/parking-list/conteneurs/conteneurs.module'
                      ).then((m) => m.ConteneursModule),
                  }
                ],
              },

              //exports/bill-of-landing
              {
                path: 'bill-of-landing',
                loadChildren: () =>
                  import(
                    './modules/admin/operations/bill-of-landing/bill-of-landings.module'
                  ).then((m) => m.BillOfLandingModule),
              },
            ],
          },

          //operations/statistiques
          {
            path: 'statistiques',
            children: [
              {
                path: 'inventaire',
                loadChildren: () =>
                  import(
                    './modules/admin/operations/statistiques/inventaire/inventaire.module'
                  ).then((m) => m.InventaireModule),
              },
              {
                path: 'rapport-exportateur',
                loadChildren: () =>
                  import(
                    './modules/admin/operations/statistiques/rapport-exportateur/rapport-exportateur.module'
                  ).then((m) => m.RapportExportateurModule),
              },
              {
                path: 'generale',
                loadChildren: () =>
                  import(
                    './modules/admin/operations/statistiques/generale/generale.module'
                  ).then((m) => m.GeneraleModule),
              },
            ],
          },
        ],
      },

      //Finances
      {
        path: 'finances',
        children: [
          // finances/comptes
          {
            path: 'comptes',
            loadChildren: () =>
              import('./modules/admin/finances/compte/compte.module').then(
                (m) => m.CompteModule
              ),
          },
          //finances/suivis-des-engagements
          {
            path: 'suivis-engagements',
            children: [
              {
                path: 'prefinancement-fournisseur',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/suivi-engagements/prefinancement-fournisseur/prefinancement-fournisseur.module'
                  ).then((m) => m.PrefinancementFournisseurModule),
              },
              {
                path: 'prefinancement-groupement',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/suivi-engagements/prefinancement-groupement/prefinancement-groupement.module'
                  ).then((m) => m.PrefinancementGroupementModule),
              },
            ],
          },

          //finances/nantissements
          {
            path: 'nantissements',
            children: [
              {
                path: 'demande-nantissement',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/nantissement/demande-nantissement/demande-nantissement.module'
                  ).then((m) => m.DemandeNantissementModule),
              },
              {
                path: 'lettre-tiers-detention',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/nantissement/lettre-tiers-detention/lettre-tiers-detention.module'
                  ).then((m) => m.LettreTiersDetentionModule),
              },
            ],
          },

          //finances/facturations
          {
            path: 'facturations',
            children: [
              {
                path: 'facture',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/facturation/facture/facture.module'
                  ).then((m) => m.FactureModule),
              },
              {
                path: 'reglement-facture',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/facturation/reglement-facture/reglement-facture.module'
                  ).then((m) => m.ReglementFactureModule),
              },
            ],
          },

          //finances/avance-contrat
          {
            path: 'avance-contrat',
            children: [
              {
                path: 'facture',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/avance-contrat/facture-avance-contrat/facture-avance-contrat.module'
                  ).then((m) => m.FactureAvanceContratModule),
              },
              {
                path: 'reglement-facture',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/avance-contrat/reglement-facture-avance-contrat/reglement-facture-avance-contrat.module'
                  ).then((m) => m.ReglementFactureAvanceContratModule),
              },
            ],
          },

          //finances/controle-arrive
          {
            path: 'controle-arrive',
            loadChildren: () =>
              import(
                './modules/admin/finances/controle-arrive/controle-arrive.module'
              ).then((m) => m.ControleArriveModule),
          },

          //finances/contrat
          {
            path: 'contrat',
            children: [
              {
                path: 'contrat',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/contrat/contrat/contrat.module'
                  ).then((m) => m.ContratModule),
              },
              {
                path: 'sous-contrat',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/contrat/sous-contrat/sous-contrat.module'
                  ).then((m) => m.SousContratModule),
              },
              {
                path: 'suivi-contrat',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/contrat/suivi-contrats/suivi-contrats.module'
                  ).then((m) => m.SuiviContratsModule),
              },
            ],
          },

          //finances/statistiques
          {
            path: 'statistique',
            children: [
              {
                path: 'suivis-engagement',
                loadChildren: () =>
                  import(
                    './modules/admin/finances/statistique/suivis-engagements/suivis-engagements.module'
                  ).then((m) => m.SuivisEngagementsModule),
              },
            ],
          },
        ],
      },

      //Comptabilité
      {
        path: 'comptabilite',
        children: [
          {
            path: 'charge-operationnelle',
            children: [
              {
                path: 'charges',
                loadChildren: () =>
                  import(
                    './modules/admin/comptabilite/charge-operationnelle/charges-operationnelle/charges-operationnelle.module'
                  ).then((m) => m.ChargesOperationnelleModule),
              },
              {
                path: 'reglements',
                loadChildren: () =>
                  import(
                    './modules/admin/comptabilite/charge-operationnelle/reglements-charge-operationnelle/reglements-charge-operationnelle.module'
                  ).then((m) => m.ReglementsChargeOperationnelleModule),
              },
            ],
          },
          {
            path: 'charge-diverse',
            children: [
              {
                path: 'charges',
                loadChildren: () =>
                  import(
                    './modules/admin/comptabilite/charge-diverse/charges-diverse/charges-diverse.module'
                  ).then((m) => m.ChargesDiverseModule),
              },
              {
                path: 'reglements',
                loadChildren: () =>
                  import(
                    './modules/admin/comptabilite/charge-diverse/reglements-diverse/reglements-diverse.module'
                  ).then((m) => m.ReglementsDiverseModule),
              },
            ],
          },
          {
            path: 'reporting',
            children: [
              {
                path: 'compte-resultats',
                loadChildren: () =>
                  import(
                    './modules/admin/comptabilite/reporting/compte-resultat/compte-resultat.module'
                  ).then((m) => m.CompteResultatModule),
              },
              {
                path: 'etats-charges',
                loadChildren: () =>
                  import(
                    './modules/admin/comptabilite/reporting/etats-charges/etats-charges.module'
                  ).then((m) => m.EtatsChargesModule),
              },
            ],
          },
        ],
      },

      //Administration
      {
        path: 'administration',
        children: [
          {
            path: 'operations',
            loadChildren: () =>
              import(
                './modules/admin/administration/operations/operations.module'
              ).then((m) => m.OperationsModule),
          },
          {
            path: 'applicatives',
            loadChildren: () =>
              import(
                './modules/admin/administration/applicative/applicative.module'
              ).then((m) => m.ApplicativeModule),
          },
          {
            path: 'finances',
            children: [
              {
                path: 'finance',
                loadChildren: () =>
                  import(
                    './modules/admin/administration/finances/finance/finance.module'
                  ).then((m) => m.FinanceModule),
              },
              {
                path: 'banque',
                loadChildren: () =>
                  import(
                    './modules/admin/administration/finances/banque/banque.module'
                  ).then((m) => m.BanqueModule),
              },
            ],
          },
          {
            path: 'comptabilites',
            loadChildren: () =>
              import(
                './modules/admin/administration/comptabilite/comptabilite.module'
              ).then((m) => m.ComptabiliteModule),
          },
        ],
      },

      // Documentation
      {
        path: 'docs',
        children: [
          // Changelog
          {
            path: 'changelog',
            loadChildren: () =>
              import('./modules/admin/docs/changelog/changelog.module').then(
                (m) => m.ChangelogModule
              ),
          },
        ],
      },

      // 404 & Catch all
      {
        path: '404-not-found',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/admin/pages/error/error-404/error-404.module').then(
            (m) => m.Error404Module
          ),
      },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },
];
