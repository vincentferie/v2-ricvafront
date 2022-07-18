import { LoggedGuard } from './core/auth/guards/logged.guard';
import { Route } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
  // Redirect empty path to '/dashboards/project'
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/sign-in',
    data: {
      externalUrl: localStorage.removeItem('token')
    }
  },

  // Redirect signed in user to the '/dashboards/project'
  //
  // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {
    path: 'signed-to-redirect',
    // pathMatch: 'full',
    // redirectTo: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
      externalUrl: localStorage.getItem('originUrl')
    },
    resolve: {
      url: 'externalUrlRedirectResolver'
    },
  },

  // Auth routes for guests
  {
    path: '',
    canActivate: [LoggedGuard],
    // canActivateChild: [LoggedGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'confirmation-required',
        loadChildren: () =>
          import(
            './modules/auth/confirmation-required/confirmation-required.module'
          ).then((m) => m.AuthConfirmationRequiredModule),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./modules/auth/forgot-password/forgot-password.module').then(
            (m) => m.AuthForgotPasswordModule
          ),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('./modules/auth/reset-password/reset-password.module').then(
            (m) => m.AuthResetPasswordModule
          ),
      },
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./modules/auth/sign-in/sign-in.module').then(
            (m) => m.AuthSignInModule
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('./modules/auth/sign-up/sign-up.module').then(
            (m) => m.AuthSignUpModule
          ),
      },
      {
        path: 'error',
        loadChildren: () =>
          import('./modules/auth/error-500/error-500.module').then(
            (m) => m.Error500Module
          ),
      }
    ],
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

  { path: '**', redirectTo: 'error' },
];
