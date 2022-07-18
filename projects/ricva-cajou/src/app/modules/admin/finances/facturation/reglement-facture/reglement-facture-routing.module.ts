import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglementFactureComponent } from './reglement-facture.component';

const routes: Routes = [{ path: '', component: ReglementFactureComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglementFactureRoutingModule {}
