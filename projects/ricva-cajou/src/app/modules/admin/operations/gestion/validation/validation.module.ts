import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { SharedModule } from 'projects/ricva-cajou/src/app/shared/shared.module';

import { ValidationComponent } from './validation.component';
import { FuseScrollbarModule } from '@kolab/fuse/src/lib/directives/scrollbar/scrollbar.module';
import { validationRoutes } from './validation.routing';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseBreadcrumbModule, FuseCardModule, FuseLoadingBarModule, FuseTableModule } from '@kolab/fuse/src/public-api';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';
import { ListValidationComponent } from './list/list-validation.component';
import { DetailValidationComponent } from './detail/detail-validation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import localeFr from '@angular/common/locales/fr';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

registerLocaleData(localeFr);

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    ValidationComponent,
    ListValidationComponent,
    DetailValidationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(validationRoutes),

    SharedModule,
    MatSortModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    //fuse scrollbar
    FuseScrollbarModule,
    // Datatable
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    // Fuse load bar
    FuseLoadingBarModule,
    // material table
    MatCheckboxModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatStepperModule,
    MatRadioModule,
    // mat toolbar
    MatToolbarModule,
    TranslocoModule,
    FuseBreadcrumbModule,
    FuseTableModule,
    FuseCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDocViewerModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [RouterModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ValidationModule {}
