import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthSignInComponent } from './sign-in.component';
import { SharedModule } from '../../../shared/shared.module';
import { FuseCardModule } from '@kolab/fuse/src/lib/components/card';
import { FuseAlertModule } from '@kolab/fuse/src/lib/components/alert';
import { authSignInRoutes } from './sign-in.routing';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AuthSignInComponent],
  imports: [
    RouterModule.forChild(authSignInRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    FuseAlertModule,
    SharedModule,
    IvyCarouselModule,
    MatSnackBarModule,
  ],

  providers: [],
})
export class AuthSignInModule {}
