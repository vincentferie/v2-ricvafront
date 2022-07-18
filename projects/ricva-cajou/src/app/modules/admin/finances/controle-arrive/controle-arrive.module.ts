import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControleArriveRoutingModule } from './controle-arrive-routing.module';
import { ControleArriveComponent } from './controle-arrive.component';

@NgModule({
  declarations: [ControleArriveComponent],
  imports: [CommonModule, ControleArriveRoutingModule],
})
export class ControleArriveModule {}
