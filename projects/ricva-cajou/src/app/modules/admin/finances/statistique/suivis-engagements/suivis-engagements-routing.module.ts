import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuivisEngagementsComponent } from './suivis-engagements.component';

const routes: Routes = [{ path: '', component: SuivisEngagementsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuivisEngagementsRoutingModule {}
