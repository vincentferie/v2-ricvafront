import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicativeComponent } from './applicative.component';

const routes: Routes = [{ path: '', component: ApplicativeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicativeRoutingModule {}
