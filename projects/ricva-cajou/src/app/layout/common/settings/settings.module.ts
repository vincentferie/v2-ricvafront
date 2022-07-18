import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@kolab/fuse/src/lib/components/drawer';
import { MatButtonModule } from '@angular/material/button';
import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    FuseDrawerModule,
    MatButtonModule,
  ],
  exports: [SettingsComponent],
})
export class SettingsModule {}
