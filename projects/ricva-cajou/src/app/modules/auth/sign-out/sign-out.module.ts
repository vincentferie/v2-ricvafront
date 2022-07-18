import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FuseCardModule } from '@kolab/fuse/src/lib/components/card';
import { AuthSignOutComponent } from './sign-out.component';
import { authSignOutRoutes } from './sign-out.routing';
import { SharedModule } from '../../../shared/shared.module';

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
