import { NgModule } from '@angular/core';

import { RapportExportateurRoutingModule } from './rapport-exportateur-routing.module';
import { RapportExportateurComponent } from './rapport-exportateur.component';
import { SharedModule } from '@ricva-cajou/src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseBreadcrumbModule, FuseCardModule, FuseScrollbarModule, FuseTableModule } from '@kolab/fuse/src/public-api';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [RapportExportateurComponent],
  imports: [
    SharedModule,
    RapportExportateurRoutingModule,

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
export class RapportExportateurModule {}
