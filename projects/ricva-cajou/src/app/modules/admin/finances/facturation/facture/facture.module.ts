import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactureRoutingModule } from './facture-routing.module';
import { FactureComponent } from './facture.component';

@NgModule({
  declarations: [FactureComponent],
  imports: [CommonModule, FactureRoutingModule],
})
export class FactureModule {}
