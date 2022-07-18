import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompteResultatRoutingModule } from './compte-resultat-routing.module';
import { CompteResultatComponent } from './compte-resultat.component';

@NgModule({
  declarations: [CompteResultatComponent],
  imports: [CommonModule, CompteResultatRoutingModule],
})
export class CompteResultatModule {}
