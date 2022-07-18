import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SousContratRoutingModule } from './sous-contrat-routing.module';
import { SousContratComponent } from './sous-contrat.component';

@NgModule({
  declarations: [SousContratComponent],
  imports: [CommonModule, SousContratRoutingModule],
})
export class SousContratModule {}
