import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseLoadingCustomComponent } from './loading-custom.component';

@NgModule({
  declarations: [FuseLoadingCustomComponent],
  imports: [CommonModule],
  exports: [FuseLoadingCustomComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class FuseLoadingCustomModule {}
