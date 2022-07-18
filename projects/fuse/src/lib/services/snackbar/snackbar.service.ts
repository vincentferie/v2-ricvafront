import { FuseConfigService } from '@kolab/fuse/src/lib/services/config/config.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class FuseSnackBarService {

  /**
   * Constructor
   */
  constructor(private _snackBar: MatSnackBar) {}

  _success(msg: string, action: 'Fermer', timer: number = 10000) {
    this._snackBar.open(msg, action, {
      duration: timer,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success-snackbar']
    });
  }

  _info(msg: string, action: 'Fermer', timer: number = 10000) {
    this._snackBar.open(msg, action, {
      duration: timer,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['info-snackbar']
    });
  }

  _warning(msg: string, action: 'Fermer', timer: number = 12000) {
    this._snackBar.open(msg, action, {
      duration: timer,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['warning-snackbar']
    });
  }

  _danger(msg: string, action: 'Fermer', timer: number = 10000) {
    this._snackBar.open(msg, action, {
      duration: timer,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['danger-snackbar']
    });
  }
}
