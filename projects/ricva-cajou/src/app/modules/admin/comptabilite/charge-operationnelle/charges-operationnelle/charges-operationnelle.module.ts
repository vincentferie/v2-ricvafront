import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargesOperationnelleRoutingModule } from './charges-operationnelle-routing.module';
import { ChargesOperationnelleComponent } from './charges-operationnelle.component';

@NgModule({
  declarations: [ChargesOperationnelleComponent],
  imports: [CommonModule, ChargesOperationnelleRoutingModule],
})
export class ChargesOperationnelleModule {}
