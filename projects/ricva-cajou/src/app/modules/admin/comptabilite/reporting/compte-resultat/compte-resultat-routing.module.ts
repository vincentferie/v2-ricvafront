import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompteResultatComponent } from './compte-resultat.component';

const routes: Routes = [{ path: '', component: CompteResultatComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompteResultatRoutingModule {}
