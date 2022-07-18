import { Route } from '@angular/router';
import { ListCampagneComponent } from './campagne/list/list-campagne.component';

export const operationRoutes: Route[] = [
  { path: '', component: ListCampagneComponent },
  {
    path: 'campagne',
    loadChildren: () =>
      import('./campagne/campagne.module').then((m) => m.CampagneModule),
  },
  {
    path: 'campagne/outturn',
    loadChildren: () =>
      import('./campagne-outturn/campagne-outturn.module').then((m) => m.CampagneOutturnModule),
  },
  {
    path: 'campagne/tranche',
    loadChildren: () =>
      import('./campagne-tranche/campagne-tranche.module').then((m) => m.CampagneTrancheModule),
  },
  {
    path: 'entrepot',
    loadChildren: () =>
      import('./entrepot/entrepot.module').then((m) => m.EntrepotModule),
  },
  {
    path: 'site',
    loadChildren: () =>
      import('./site/site.module').then((m) => m.SiteModule),
  },
  {
    path: 'ville',
    loadChildren: () =>
      import('./ville/ville.module').then((m) => m.VilleModule),
  },
  {
    path: 'exportateur',
    loadChildren: () =>
      import('./exportateur/exportateur.module').then((m) => m.ExportateurModule),
  },
  {
    path: 'entrepot/assigne',
    loadChildren: () =>
      import('./entrepot-assigne/entrepot-assigne.module').then((m) => m.EntrepotAssigneModule),
  },
  {
    path: 'site/assigne',
    loadChildren: () =>
      import('./site-assigne/site-assigne.module').then((m) => m.SiteAssigneModule),
  }
];
