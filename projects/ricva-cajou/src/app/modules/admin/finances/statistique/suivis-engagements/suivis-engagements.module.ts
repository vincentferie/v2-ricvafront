import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuivisEngagementsRoutingModule } from './suivis-engagements-routing.module';
import { SuivisEngagementsComponent } from './suivis-engagements.component';

@NgModule({
  declarations: [SuivisEngagementsComponent],
  imports: [CommonModule, SuivisEngagementsRoutingModule],
})
export class SuivisEngagementsModule {}
