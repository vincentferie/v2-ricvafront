import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglementFactureRoutingModule } from './reglement-facture-routing.module';
import { ReglementFactureComponent } from './reglement-facture.component';

@NgModule({
  declarations: [ReglementFactureComponent],
  imports: [CommonModule, ReglementFactureRoutingModule],
})
export class ReglementFactureModule {}
