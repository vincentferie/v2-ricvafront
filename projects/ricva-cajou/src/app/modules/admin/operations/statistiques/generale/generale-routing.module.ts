import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampagnesResolver } from '../../../administration/operations/campagne/campagne.resolvers';
import { ExportateursResolver } from '../../../administration/operations/exportateur/exportateur.resolvers';
import { GeneraleComponent } from './generale.component';

const routes: Routes = [{
  path: '',
  component: GeneraleComponent,
  resolve: {
    campagnes: CampagnesResolver,
    exportateurs: ExportateursResolver,
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneraleRoutingModule {}
