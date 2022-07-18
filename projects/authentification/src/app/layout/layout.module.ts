import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SettingsModule } from './common/settings/settings.module';
import { LayoutComponent } from './layout.component';
import { EmptyLayoutModule } from './layouts/empty/empty.module';

const layoutModules = [
  // Empty
  EmptyLayoutModule,
];

@NgModule({
  declarations: [LayoutComponent],
  imports: [SharedModule, SettingsModule, ...layoutModules],
  exports: [LayoutComponent, ...layoutModules],
})
export class LayoutModule {}
