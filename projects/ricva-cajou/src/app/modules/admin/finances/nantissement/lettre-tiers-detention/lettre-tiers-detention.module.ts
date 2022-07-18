import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LettreTiersDetentionRoutingModule } from './lettre-tiers-detention-routing.module';
import { LettreTiersDetentionComponent } from './lettre-tiers-detention.component';

@NgModule({
  declarations: [LettreTiersDetentionComponent],
  imports: [CommonModule, LettreTiersDetentionRoutingModule],
})
export class LettreTiersDetentionModule {}
