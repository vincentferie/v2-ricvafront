import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import { crypto as cryptoData } from './data';

@Injectable({
  providedIn: 'root',
})
export class CryptoMockApi {
  private _crypto: any = cryptoData;

  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Crypto - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/dashboards/crypto')
      .reply(() => [200, cloneDeep(this._crypto)]);
  }
}
