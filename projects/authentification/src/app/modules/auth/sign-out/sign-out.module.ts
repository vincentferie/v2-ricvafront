import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthSignOutComponent } from './sign-out.component';
import { SharedModule } from '../../../shared/shared.module';
import { FuseCardModule } from '@kolab/fuse/src/lib/components/card';
import { authSignOutRoutes } from './sign-out.routing';

@NgModule({
  declarations: [AuthSignOutComponent],
  imports: [
    RouterModule.forChild(authSignOutRoutes),
    MatButtonModule,
    FuseCardModule,
    SharedModule,
  ],
})
export class AuthSignOutModule {}
