import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandeNantissementRoutingModule } from './demande-nantissement-routing.module';
import { DemandeNantissementComponent } from './demande-nantissement.component';

@NgModule({
  declarations: [DemandeNantissementComponent],
  imports: [CommonModule, DemandeNantissementRoutingModule],
})
export class DemandeNantissementModule {}
