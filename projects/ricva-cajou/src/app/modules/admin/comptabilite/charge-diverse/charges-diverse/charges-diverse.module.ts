import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargesDiverseRoutingModule } from './charges-diverse-routing.module';
import { ChargesDiverseComponent } from './charges-diverse.component';

@NgModule({
  declarations: [ChargesDiverseComponent],
  imports: [CommonModule, ChargesDiverseRoutingModule],
})
export class ChargesDiverseModule {}
