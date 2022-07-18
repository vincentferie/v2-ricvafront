import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComptabiliteRoutingModule } from './comptabilite-routing.module';
import { ComptabiliteComponent } from './comptabilite.component';

@NgModule({
  declarations: [ComptabiliteComponent],
  imports: [CommonModule, ComptabiliteRoutingModule],
})
export class ComptabiliteModule {}
