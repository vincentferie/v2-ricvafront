import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthResetPasswordComponent } from './reset-password.component';
import { authResetPasswordRoutes } from './reset-password.routing';
import { FuseCardModule } from '@kolab/fuse/src/lib/components/card';
import { FuseAlertModule } from '@kolab/fuse/src/lib/components/alert';
import { SharedModule } from '../../../shared/shared.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [AuthResetPasswordComponent],
  imports: [
    RouterModule.forChild(authResetPasswordRoutes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseCardModule,
    FuseAlertModule,
    SharedModule,
    IvyCarouselModule,
  ],
})
export class AuthResetPasswordModule {}
