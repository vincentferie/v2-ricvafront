import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControleArriveComponent } from './controle-arrive.component';

const routes: Routes = [{ path: '', component: ControleArriveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControleArriveRoutingModule {}
