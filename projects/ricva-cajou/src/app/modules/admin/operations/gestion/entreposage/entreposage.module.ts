import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'projects/ricva-cajou/src/app/shared/shared.module';

import { EntreposageComponent } from './entreposage.component';
import { FuseScrollbarModule } from '@kolab/fuse/src/lib/directives/scrollbar/scrollbar.module';
import { entreposageRoutes } from './entreposage.routing';
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
import { ListEntreposageComponent } from './list/list-entreposage.component';
import { CreationEntreposageComponent } from './creation/creation-entreposage.component';
import { DetailEntreposageComponent } from './detail/detail-entreposage.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    EntreposageComponent,
    ListEntreposageComponent,
    CreationEntreposageComponent,
    DetailEntreposageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(entreposageRoutes),

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
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDocViewerModule,
    FuseCardModule,
    MatAutocompleteModule
  ],
  exports: [RouterModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class EntreposageModule {}
