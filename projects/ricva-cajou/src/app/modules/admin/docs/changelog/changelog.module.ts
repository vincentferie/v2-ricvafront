import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'projects/ricva-cajou/src/app/shared/shared.module';
import { ChangelogComponent } from './changelog';
import { changelogRoutes } from './changelog.routing';

@NgModule({
  declarations: [ChangelogComponent],
  imports: [RouterModule.forChild(changelogRoutes), SharedModule],
})
export class ChangelogModule {}
