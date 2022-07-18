import { NgModule } from '@angular/core';
import { FusePermissionsService } from './permission.service';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [NgxPermissionsModule.forRoot()],
  providers: [FusePermissionsService],
})
export class FusePermissionsModule {
  /**
   * Constructor
   */
  constructor(private _fusePermissionsService: FusePermissionsService) {}
}
