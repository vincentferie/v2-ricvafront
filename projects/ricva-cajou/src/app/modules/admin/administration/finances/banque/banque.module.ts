import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BanqueRoutingModule } from './banque-routing.module';
import { BanqueComponent } from './banque.component';

@NgModule({
  declarations: [BanqueComponent],
  imports: [CommonModule, BanqueRoutingModule],
})
export class BanqueModule {}
