import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseScrollbarModule } from '@kolab/fuse/src/lib/directives/scrollbar/scrollbar.module';
import { FuseHorizontalNavigationBasicItemComponent } from './horizontal/components/basic/basic.component';
import { FuseHorizontalNavigationComponent } from './horizontal/horizontal.component';
import { FuseVerticalNavigationComponent } from './vertical/vertical.component';
import { FuseHorizontalNavigationBranchItemComponent } from './horizontal/components/branch/branch.component';
import { FuseHorizontalNavigationDividerItemComponent } from './horizontal/components/divider/divider.component';
import { FuseHorizontalNavigationSpacerItemComponent } from './horizontal/components/spacer/spacer.component';
import { FuseVerticalNavigationSpacerItemComponent } from './vertical/components/spacer/spacer.component';
import { FuseVerticalNavigationGroupItemComponent } from './vertical/components/group/group.component';
import { FuseVerticalNavigationDividerItemComponent } from './vertical/components/divider/divider.component';
import { FuseVerticalNavigationBasicItemComponent } from './vertical/components/basic/basic.component';
import { FuseVerticalNavigationAsideItemComponent } from './vertical/components/aside/aside.component';
import { FuseVerticalNavigationCollapsableItemComponent } from './vertical/components/collapsable/collapsable.component';

@NgModule({
  declarations: [
    //horizontal
    FuseHorizontalNavigationBasicItemComponent,
    FuseHorizontalNavigationBranchItemComponent,
    FuseHorizontalNavigationDividerItemComponent,
    FuseHorizontalNavigationSpacerItemComponent,
    FuseHorizontalNavigationComponent,

    //verical
    FuseVerticalNavigationAsideItemComponent,
    FuseVerticalNavigationBasicItemComponent,
    FuseVerticalNavigationCollapsableItemComponent,
    FuseVerticalNavigationDividerItemComponent,
    FuseVerticalNavigationGroupItemComponent,
    FuseVerticalNavigationSpacerItemComponent,
    FuseVerticalNavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    FuseScrollbarModule,
  ],
  exports: [FuseHorizontalNavigationComponent, FuseVerticalNavigationComponent],
})
export class FuseNavigationModule {}
