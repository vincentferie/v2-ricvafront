import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuiviContratsRoutingModule } from './suivi-contrats-routing.module';
import { SuiviContratsComponent } from './suivi-contrats.component';

@NgModule({
  declarations: [SuiviContratsComponent],
  imports: [CommonModule, SuiviContratsRoutingModule],
})
export class SuiviContratsModule {}
