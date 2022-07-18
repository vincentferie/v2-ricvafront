import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FuseBreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  declarations: [FuseBreadcrumbComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [FuseBreadcrumbComponent],
})
export class FuseBreadcrumbModule {}
