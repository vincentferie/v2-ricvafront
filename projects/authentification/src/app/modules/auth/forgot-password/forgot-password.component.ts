import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations';
import { FuseAlertType } from '@kolab/fuse/src/lib/components/alert';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthForgotPasswordComponent implements OnInit {
  //@ts-ignore
  @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  //@ts-ignore
  forgotPasswordForm: FormGroup;
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
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Send the reset link
   */
  sendResetLink(): void {
    // Return if the form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    // Disable the form
    this.forgotPasswordForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Forgot password
    this._authService
      //@ts-ignore
      .forgotPassword(this.forgotPasswordForm.get('email').value)
      .pipe(
        finalize(() => {
          // Re-enable the form
          this.forgotPasswordForm.enable();

          // Reset the form
          this.forgotPasswordNgForm.resetForm();

          // Show the alert
          this.showAlert = true;
        })
      )
      .subscribe(
        (response: any) => {
          // Set the alert
          this.alert = {
            type: 'success',
            message:
              "Password reset sent! You'll receive an email if you are registered on our system.",
          };
        },
        (response: any) => {
          // Set the alert
          this.alert = {
            type: 'error',
            message:
              'Email does not found! Are you sure you are already a member?',
          };
        }
      );
  }
}
