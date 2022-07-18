import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicativeRoutingModule } from './applicative-routing.module';
import { ApplicativeComponent } from './applicative.component';

@NgModule({
  declarations: [ApplicativeComponent],
  imports: [CommonModule, ApplicativeRoutingModule],
})
export class ApplicativeModule {}
