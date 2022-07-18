import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampagnesResolver } from '../../../administration/operations/campagne/campagne.resolvers';
import { EntrepotsResolver } from '../../../administration/operations/entrepot/entrepot.resolvers';
import { InventaireComponent } from './inventaire.component';

const routes: Routes = [{
  path: '',
  component: InventaireComponent,
  resolve: {
    campagnes: CampagnesResolver,
    entrepots: EntrepotsResolver,
  },
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventaireRoutingModule {}
