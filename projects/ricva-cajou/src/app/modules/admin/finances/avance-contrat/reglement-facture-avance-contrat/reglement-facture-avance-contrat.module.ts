import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglementFactureAvanceContratRoutingModule } from './reglement-facture-avance-contrat-routing.module';
import { ReglementFactureAvanceContratComponent } from './reglement-facture-avance-contrat.component';

@NgModule({
  declarations: [ReglementFactureAvanceContratComponent],
  imports: [CommonModule, ReglementFactureAvanceContratRoutingModule],
})
export class ReglementFactureAvanceContratModule {}
