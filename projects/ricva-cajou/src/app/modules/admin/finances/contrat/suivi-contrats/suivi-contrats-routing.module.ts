import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuiviContratsComponent } from './suivi-contrats.component';

const routes: Routes = [{ path: '', component: SuiviContratsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuiviContratsRoutingModule {}
