import { Injectable } from "@angular/core";
import { FuseConfirmationService, FuseConnectivityService } from "@kolab/fuse/src/public-api";

@Injectable()
export class NoInternet {
  public internet() {
    console.log('No connexion internet...');
  }
}
