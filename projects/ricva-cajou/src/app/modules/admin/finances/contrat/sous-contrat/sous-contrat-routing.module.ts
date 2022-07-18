import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SousContratComponent } from './sous-contrat.component';

const routes: Routes = [{ path: '', component: SousContratComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SousContratRoutingModule {}
