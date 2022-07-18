import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrefinancementFournisseurComponent } from './prefinancement-fournisseur.component';

const routes: Routes = [
  { path: '', component: PrefinancementFournisseurComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefinancementFournisseurRoutingModule {}
