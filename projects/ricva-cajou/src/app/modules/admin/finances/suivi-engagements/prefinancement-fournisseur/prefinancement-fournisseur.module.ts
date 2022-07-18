import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrefinancementFournisseurRoutingModule } from './prefinancement-fournisseur-routing.module';
import { PrefinancementFournisseurComponent } from './prefinancement-fournisseur.component';

@NgModule({
  declarations: [PrefinancementFournisseurComponent],
  imports: [CommonModule, PrefinancementFournisseurRoutingModule],
})
export class PrefinancementFournisseurModule {}
