import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LettreTiersDetentionComponent } from './lettre-tiers-detention.component';

const routes: Routes = [{ path: '', component: LettreTiersDetentionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LettreTiersDetentionRoutingModule {}
