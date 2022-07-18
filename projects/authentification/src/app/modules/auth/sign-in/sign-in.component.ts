import { User } from './../../../core/config/db.config';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations';
import { FuseAlertType } from '@kolab/fuse/src/lib/components/alert';
import { AuthService } from '../../../core/auth/auth.service';
import { Encrypt, Globale } from '@kolab/fuse/src/lib/services/globale';
import { HttpParams } from '@angular/common/http';
import { environment } from '@authentification/src/environments/environment';
import { FuseSnackBarService } from '@kolab/fuse/src/lib/services/snackbar';
import { FuseIndexedDbService } from '@kolab/fuse/src/public-api';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  styleUrls: ['./sign-in.component.scss'],
})
export class AuthSignInComponent implements OnInit {
  //@ts-ignore
  @ViewChild('signInNgForm') signInNgForm: NgForm;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  //@ts-ignore
  signInForm: FormGroup;
  showAlert: boolean = false;

  images = [
    {
      path: 'assets/ricva/login/img1.png',
    },
    {
      path: 'assets/ricva/login/img2.png',
    },
    {
      path: 'assets/ricva/login/img3.png',
    }
  ];

  user: User;
  object = {
    appAccess: [
      {
        id: "9e59fc8a-db1b-405e-bf9d-b6fa2601d38c",
        url: ".cashew"
      }
    ],
    clientInfo: {
      libelle: "CAP SIKAN SA",
      description: "Negoce & Agriculture",
      contribuable: "AB-0002-P-C1",
      contact: "+225 00 00 00 00 00",
      email: "sishi.rikudo@gmail.com",
      postal: "06 BP 1903 ABJ 06",
      lieu: "Angré 8eme tranche",
      logo: {
        customer_id: "fa583de6-e41a-4c7e-83b2-5d9ed975d404",
        filename: "LogoRIVCA-13-62be4412a6c7f10f6b43f.png",
        path: "uploads/customer_logo/LogoRIVCA-13-62be4412a6c7f10f6b43f.png"
      }
    }
  }

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _snackBar: FuseSnackBarService,
    private _fuseIndexedDbService: FuseIndexedDbService
  ) {
    this._setGlobalValue();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rememberMe: [null],
    });
  }

  _setGlobalValue() {
    this._fuseIndexedDbService.userCount$.subscribe((count: number) => {
      if (count === 0) {
        var user = {...this.user, accesCode: 'CAPSIKANSA-#Sr/_EQ}E)f)Y[s', accesTenant: '849cb89c-a77b-4fe6-b8e9-5fc2f76f4c7c', appAccess: [``], accessToken: ``, refreshToken: `` };
        this._fuseIndexedDbService.user = user;
      }
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService.login(this.signInForm.value).subscribe(
      (res) => {
        const response = res[0];
        const data = res[1];
        if(response.response.state === 202) {
          this._snackBar._success(response.response.message, null);
          //URL courante en lieu et place de l'URL localstorage
          Globale.user = data;
          const appAcces = data.appAccess[0].url ?? null;
          const appAccesId = data?.appAccess[0].id ?? null;
          const token = data?.accessToken ?? 'no token';

          const domain = environment.production === true ? appAcces : '.cashew.ricva.local';
          const domainId = appAccesId;
          if(appAcces !== null && token !== 'no token') {
            const tokenCrypted = Encrypt(token.toString());
            const specuCrypted = Encrypt(domain.toString());
            const specuIdCrypted = Encrypt(domainId.toString());
            const originUrl = localStorage.getItem('originUrl')?.toString().replace(environment.domain, domain);
            if(originUrl && tokenCrypted) {
              let params = new HttpParams();
              params = params.set('envValue', tokenCrypted);
              params = params.set('specu', specuCrypted);
              params = params.set('specuId', specuIdCrypted);
              const url = originUrl + '/#/?' + params.toString();
              window.location.href = url;
            }
          }
        }
      },
      (_response) => {
        //     // Re-enable the form
        this.signInForm.enable();

        //     // Reset the form
        this.signInNgForm.resetForm();

        //     // Set the alert
        this.alert = {
          type: 'error',
          message: 'Wrong email or password',
        };

        //     // Show the alert
        this.showAlert = true;
      }
    );
  }
}
