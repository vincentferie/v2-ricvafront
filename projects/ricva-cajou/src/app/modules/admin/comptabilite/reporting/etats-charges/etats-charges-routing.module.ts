import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtatsChargesComponent } from './etats-charges.component';

const routes: Routes = [{ path: '', component: EtatsChargesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtatsChargesRoutingModule {}
