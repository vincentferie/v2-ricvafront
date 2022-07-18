import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglementsDiverseRoutingModule } from './reglements-diverse-routing.module';
import { ReglementsDiverseComponent } from './reglements-diverse.component';

@NgModule({
  declarations: [ReglementsDiverseComponent],
  imports: [CommonModule, ReglementsDiverseRoutingModule],
})
export class ReglementsDiverseModule {}
