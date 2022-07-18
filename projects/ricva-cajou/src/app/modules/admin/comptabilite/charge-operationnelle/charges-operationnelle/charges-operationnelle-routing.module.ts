import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargesOperationnelleComponent } from './charges-operationnelle.component';

const routes: Routes = [
  { path: '', component: ChargesOperationnelleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargesOperationnelleRoutingModule {}
