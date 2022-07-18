import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompteRoutingModule } from './compte-routing.module';
import { CompteComponent } from './compte.component';

@NgModule({
  declarations: [CompteComponent],
  imports: [CommonModule, CompteRoutingModule],
})
export class CompteModule {}
