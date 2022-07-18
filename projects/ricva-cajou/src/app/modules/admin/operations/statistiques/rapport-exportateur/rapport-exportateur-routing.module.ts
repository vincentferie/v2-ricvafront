import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampagnesResolver } from '../../../administration/operations/campagne/campagne.resolvers';
import { ExportateursResolver } from '../../../administration/operations/exportateur/exportateur.resolvers';
import { RapportExportateurComponent } from './rapport-exportateur.component';

const routes: Routes = [{
  path: '',
  component: RapportExportateurComponent,
  resolve: {
    campagnes: CampagnesResolver,
    exportateurs: ExportateursResolver,
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RapportExportateurRoutingModule {}
