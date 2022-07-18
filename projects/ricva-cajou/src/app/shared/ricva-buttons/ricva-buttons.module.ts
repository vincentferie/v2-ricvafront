import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RicvaButtonsComponent } from './ricva-buttons.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [RicvaButtonsComponent],
  imports: [CommonModule, MatIconModule, MatMenuModule, TranslocoModule],
  exports: [RicvaButtonsComponent],
})
export class RicvaButtonsModule {}
