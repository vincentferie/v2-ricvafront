import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrefinancementGroupementRoutingModule } from './prefinancement-groupement-routing.module';
import { PrefinancementGroupementComponent } from './prefinancement-groupement.component';

@NgModule({
  declarations: [PrefinancementGroupementComponent],
  imports: [CommonModule, PrefinancementGroupementRoutingModule],
})
export class PrefinancementGroupementModule {}
