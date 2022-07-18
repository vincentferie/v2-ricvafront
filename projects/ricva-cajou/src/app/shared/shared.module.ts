import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RicvaButtonsModule } from './ricva-buttons/ricva-buttons.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RicvaButtonsModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, RicvaButtonsModule],
})
export class SharedModule {}
