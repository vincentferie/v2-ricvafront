import { FuseTableModule } from '@kolab/fuse/src/lib/components/table';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FuseScrollbarModule } from '@kolab/fuse/src/lib/directives/scrollbar/scrollbar.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseCardModule, FuseLoadingBarModule } from '@kolab/fuse/src/public-api';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'projects/ricva-cajou/src/app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';
import { FuseBreadcrumbModule } from '@kolab/fuse/src/lib/components/breadcrumb';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { campagneRoutes } from './campagne.routing';
import { ListCampagneComponent } from './list/list-campagne.component';
import { DetailCampagneComponent } from './detail/detail-campagne.component';
import { CreationCampagneComponent } from './creation/creation-campagne.component';
import { MenuModule } from '../../menu/menu.module';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CampagneComponent } from './campagne.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    CampagneComponent,
    CreationCampagneComponent,
    ListCampagneComponent,
    DetailCampagneComponent,
  ],
  imports: [
    RouterModule.forChild(campagneRoutes),

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
    MatAutocompleteModule,
    MenuModule
  ],
  exports: [RouterModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class CampagneModule {}
