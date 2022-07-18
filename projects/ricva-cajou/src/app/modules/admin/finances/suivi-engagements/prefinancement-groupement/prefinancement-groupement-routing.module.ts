import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrefinancementGroupementComponent } from './prefinancement-groupement.component';

const routes: Routes = [
  { path: '', component: PrefinancementGroupementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrefinancementGroupementRoutingModule {}
