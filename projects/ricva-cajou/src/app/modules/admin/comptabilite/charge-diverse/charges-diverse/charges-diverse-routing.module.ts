import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargesDiverseComponent } from './charges-diverse.component';

const routes: Routes = [{ path: '', component: ChargesDiverseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargesDiverseRoutingModule {}
