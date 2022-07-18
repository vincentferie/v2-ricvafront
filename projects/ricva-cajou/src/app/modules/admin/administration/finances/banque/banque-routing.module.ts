import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanqueComponent } from './banque.component';

const routes: Routes = [{ path: '', component: BanqueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanqueRoutingModule {}
