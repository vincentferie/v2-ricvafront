import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglementsDiverseComponent } from './reglements-diverse.component';

const routes: Routes = [{ path: '', component: ReglementsDiverseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglementsDiverseRoutingModule {}
