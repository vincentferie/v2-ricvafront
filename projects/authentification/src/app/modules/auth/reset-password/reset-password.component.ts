import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations';
import { finalize } from 'rxjs';
import { FuseValidators } from '@kolab/fuse/src/lib/validators';
import { FuseAlertType } from '@kolab/fuse/src/lib/components/alert';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthResetPasswordComponent implements OnInit {
  //@ts-ignore
  @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  //@ts-ignore
  resetPasswordForm: FormGroup;
  showAlert: boolean = false;

  images = [
    {
      path: 'https://www.cubictelecom.com/wordpress/wp-content/uploads/2021/06/precision-farming-agtech-agritech-shutterstock_1569043051-Cropped-scaled.jpg',
    },
    {
      path: 'https://www.dinifarm.gr/images/dinifarm/images/farm-big-bank-lending.jpg',
    },
    {
      path: 'https://bigdataanalyticsnews.com/wp-content/uploads/2018/09/big-data-in-farming.jpg',
    },
  ];

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.resetPasswordForm = this._formBuilder.group(
      {
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: FuseValidators.mustMatch('password', 'passwordConfirm'),
      }
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset password
   */
  resetPassword(): void {
    // Return if the form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    // Disable the form
    this.resetPasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Send the request to the server
    this._authService
      //@ts-ignore
      .resetPassword(this.resetPasswordForm.get('password').value)
      .pipe(
        finalize(() => {
          // Re-enable the form
          this.resetPasswordForm.enable();

          // Reset the form
          this.resetPasswordNgForm.resetForm();

          // Show the alert
          this.showAlert = true;
        })
      )
      .subscribe(
        (response: any) => {
          // Set the alert
          this.alert = {
            type: 'success',
            message: 'Your password has been reset.',
          };
        },
        (response: any) => {
          // Set the alert
          this.alert = {
            type: 'error',
            message: 'Something went wrong, please try again.',
          };
        }
      );
  }
}
