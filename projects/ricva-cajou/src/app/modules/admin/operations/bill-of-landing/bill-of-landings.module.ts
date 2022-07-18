import { FuseTableModule } from '@kolab/fuse/src/lib/components/table';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FuseScrollbarModule } from '@kolab/fuse/src/lib/directives/scrollbar/scrollbar.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseLoadingBarModule } from '@kolab/fuse/src/public-api';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from 'projects/ricva-cajou/src/app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';
import { FuseBreadcrumbModule } from '@kolab/fuse/src/lib/components/breadcrumb';

import { BillOfLandingsComponent } from './bill-of-landings.component';
import { billOfLandingRoutes } from './bill-of-landings.routing';
import { ListBillOfLandingComponent } from './list/list-bill-of-landing.component';
import { CreationBillOfLandingComponent } from './creation/creation-bill-of-landing.component';
import { DetailBillOfLandingComponent } from './detail/detail-bill-of-landing.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    BillOfLandingsComponent,
    ListBillOfLandingComponent,
    CreationBillOfLandingComponent,
    DetailBillOfLandingComponent,
  ],
  imports: [
    RouterModule.forChild(billOfLandingRoutes),

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
    NgxDocViewerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class BillOfLandingModule {}
