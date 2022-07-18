import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglementsChargeOperationnelleRoutingModule } from './reglements-charge-operationnelle-routing.module';
import { ReglementsChargeOperationnelleComponent } from './reglements-charge-operationnelle.component';

@NgModule({
  declarations: [ReglementsChargeOperationnelleComponent],
  imports: [CommonModule, ReglementsChargeOperationnelleRoutingModule],
})
export class ReglementsChargeOperationnelleModule {}
