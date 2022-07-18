import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglementFactureAvanceContratComponent } from './reglement-facture-avance-contrat.component';

const routes: Routes = [
  { path: '', component: ReglementFactureAvanceContratComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglementFactureAvanceContratRoutingModule {}
