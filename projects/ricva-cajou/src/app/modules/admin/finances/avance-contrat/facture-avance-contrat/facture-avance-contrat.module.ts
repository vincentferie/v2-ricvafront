import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureAvanceContratRoutingModule } from './facture-avance-contrat-routing.module';
import { FactureAvanceContratComponent } from './facture-avance-contrat.component';

@NgModule({
  declarations: [FactureAvanceContratComponent],
  imports: [CommonModule, FactureAvanceContratRoutingModule],
})
export class FactureAvanceContratModule {}
