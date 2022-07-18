import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtatsChargesRoutingModule } from './etats-charges-routing.module';
import { EtatsChargesComponent } from './etats-charges.component';

@NgModule({
  declarations: [EtatsChargesComponent],
  imports: [CommonModule, EtatsChargesRoutingModule],
})
export class EtatsChargesModule {}
