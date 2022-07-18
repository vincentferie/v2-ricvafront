import { NgModule } from '@angular/core';
import { InventaireRoutingModule } from './inventaire-routing.module';
import { InventaireComponent } from './inventaire.component';
import { FuseBreadcrumbModule, FuseCardModule, FuseScrollbarModule, FuseTableModule } from '@kolab/fuse/src/public-api';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@ricva-cajou/src/app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [InventaireComponent],
  imports: [
    SharedModule,
    InventaireRoutingModule,

    MatSortModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    //fuse scrollbar
    FuseScrollbarModule,
    MatTooltipModule,
    FuseCardModule,
    FuseBreadcrumbModule,
    FuseTableModule,
  ],
})
export class InventaireModule {}
