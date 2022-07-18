import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandeNantissementComponent } from './demande-nantissement.component';

const routes: Routes = [{ path: '', component: DemandeNantissementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandeNantissementRoutingModule {}
