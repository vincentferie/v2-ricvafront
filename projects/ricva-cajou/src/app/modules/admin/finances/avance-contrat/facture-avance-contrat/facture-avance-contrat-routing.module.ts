import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactureAvanceContratComponent } from './facture-avance-contrat.component';

const routes: Routes = [{ path: '', component: FactureAvanceContratComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FactureAvanceContratRoutingModule {}
