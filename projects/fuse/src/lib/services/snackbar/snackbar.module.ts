import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FuseSnackBarService } from './snackbar.service';

@NgModule({
  imports: [MatSnackBarModule],
  providers: [FuseSnackBarService],
})
export class FuseSnackBarModule {
  /**
   * Constructor
   */
  constructor(private _fuseIndexedDbService: FuseSnackBarService) {}
}
