import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '@ricva-cajou/src/app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuOperationComponent } from '../menu/operation/menu-operation.component';

@NgModule({
  declarations: [
    MenuOperationComponent
  ],
  exports: [
    MenuOperationComponent
  ],
  imports: [
    SharedModule,
    MatSortModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    TranslocoModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class MenuModule {}
