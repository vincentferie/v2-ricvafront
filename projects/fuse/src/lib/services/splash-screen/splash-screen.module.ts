import { NgModule } from '@angular/core';
import { FuseSplashScreenService } from '../splash-screen';

@NgModule({
  providers: [FuseSplashScreenService],
})
export class FuseSplashScreenModule {
  /**
   * Constructor
   */
  constructor(private _fuseSplashScreenService: FuseSplashScreenService) {}
}
