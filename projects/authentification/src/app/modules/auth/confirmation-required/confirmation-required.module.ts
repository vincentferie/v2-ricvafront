import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthConfirmationRequiredComponent } from './confirmation-required.component';
import { SharedModule } from '../../../shared/shared.module';
import { authConfirmationRequiredRoutes } from './confirmation-required.routing';
import { FuseCardModule } from '@kolab/fuse/src/lib/components/card';

@NgModule({
  declarations: [AuthConfirmationRequiredComponent],
  imports: [
    RouterModule.forChild(authConfirmationRequiredRoutes),
    MatButtonModule,
    FuseCardModule,
    SharedModule,
  ],
})
export class AuthConfirmationRequiredModule {}
