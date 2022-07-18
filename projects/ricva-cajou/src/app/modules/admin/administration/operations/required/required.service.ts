import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { ApiService } from '@ricva-cajou/src/app/core/utils/api.service';
import { environment } from '@ricva-cajou/src/environments/environment';
import { StateChargement } from '../../../operations/gestion/dechargements/dechargement.types';
import { StateType } from '../../../operations/exports/parking-list/conteneurs/conteneur.types';
import { StateBooking } from '../../../operations/exports/parking-list/bookings/booking.types';
import { StateLots } from '../../../operations/gestion/entreposage/entreposage.types';
import { CampagneRequired } from './required.types';

@Injectable({
  providedIn: 'root',
})
export class RequiredService {
  private _stateChargement: BehaviorSubject<StateChargement | null> =
    new BehaviorSubject(null);
  private _stateType: BehaviorSubject<StateType | null> =
    new BehaviorSubject(null);
  private _stateBooking: BehaviorSubject<StateBooking | null> =
    new BehaviorSubject(null);
  private _stateLots: BehaviorSubject<StateLots | null> =
    new BehaviorSubject(null);
  private _campagnes: BehaviorSubject<CampagneRequired[] | null> =
    new BehaviorSubject(null);

  //URL
  private url = 'required';

  datas: any = {
    "statutDechargement": {
        "refraction": 2,
        "rejeter": 0,
        "valider": 1
    },
    "statutTirage": {
        "subvention": 4,
        "rapatriement": 3,
        "nantissement": 2,
        "decouvert": 1,
        "autres": 5
    },
    "typeConteneur": {
        "quarantePied": "20’",
        "vingtPied": "40’"
    },
    "statutBooking": {
        "encours": 0,
        "terminer": 1
    },
    "statutLots": {
        "denantis": 3,
        "nantis": 1,
        "relacher": 2
    },
    "typeMouvement": {
        "credit": "CREDIT",
        "debit": "DEBIT"
    },
    "natureOperation": {
        "appro": "APPROVISIONNEMENT",
        "regleClient": "REGLEMENT CLIENT",
        "nivellement": "NIVELLEMENT",
        "achatCajou": "ACHAT CAJOU",
        "valorisation": "VALORISATION STOCK FINAL",
        "dus": "DUS",
        "miseAfob": "MISE A FOB",
        "magasinage": "MAGASINAGE",
        "magManu": "MAGASINAGE & MANUTENTION",
        "manutention": "MANUTENTION",
        "tierceDetention": "TIERCE DETENTION",
        "chargeViet": "CHARGES VIETNAM",
        "areca": "ARECA",
        "fret": "FRET MARITIME",
        "chargeFonct": "CHARGES DE FONCTIONNEMENT",
        "chargeFin": "CHARGES FINANCIERES",
        "perteChange": "PERTE DE CHANGE",
        "gainChange": "GAIN DE CHANGE",
        "nantissement": "NANTISSEMENT"
    }
  };

  /**
   * Constructor
   */
  constructor(private api: ApiService) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get campagnes$(): Observable<CampagneRequired[]> {
    // if(environment.production) {
    //   return new Observable<CampagneRequired[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this._campagnes.asObservable();
  }

  get stateChargement$(): Observable<StateChargement> {
    // if(environment.production) {
    //   return new Observable<StateChargement>(obs => {
    //     obs.next(this.datas.statutDechargement);
    //   });
    // }
    return this._stateChargement.asObservable();
  }

  /**
   * Getter for state type conteneur
   */
  get stateType$(): Observable<StateType> {
    if(environment.production) {
      return new Observable<StateType>(obs => {
        obs.next(this.datas.typeConteneur);
      });
    }
    return this._stateType.asObservable();
  }

  /**
   * Getter for state booking
   */
  get stateBooking$(): Observable<StateBooking> {
    if(environment.production) {
      return new Observable<StateBooking>(obs => {
        obs.next(this.datas.statutBooking);
      });
    }
    return this._stateBooking.asObservable();
  }

  /**
   * Getter for state booking
   */
  get stateLots$(): Observable<StateLots> {
    if(environment.production) {
      return new Observable<StateLots>(obs => {
        obs.next(this.datas.statutLots);
      });
    }
    return this._stateLots.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get campagne
   */
  getCampagnes(comodities: string): Observable<CampagneRequired[]> {
    // if(environment.production) {
    //   return new Observable<CampagneRequired[]>(obs => {
    //     obs.next(this.datas);
    //   });
    // }
    return this.api._get(`${this.url}/campagne/` + comodities)
      .pipe(
        tap((response: any) => {
          this._campagnes.next(response?.response.data);
        }),
        map((response: any) => response?.response.data),
        catchError((error: any) => throwError(error))
      );
  }

  /**
   * Get state dechargement
   */
  getStateChargement(): Observable<StateChargement> {
    // if(environment.production) {
    //   return new Observable<StateChargement>(obs => {
    //     obs.next(this.datas.statutDechargement);
    //   });
    // }
    return this.api
      ._get(`${this.url}/enum-list`)
      .pipe(
        tap((response: any) => {
          this._stateChargement.next(response?.response.data?.statutDechargement);
        }),
        map((response: any) => response?.response.data?.statutDechargement)
      );
  }

  /**
   * Get state type conteneur
   */
  getStateType(): Observable<StateType> {
    // if(environment.production) {
    //   return new Observable<StateType>(obs => {
    //     obs.next(this.datas.typeConteneur);
    //   });
    // }
    return this.api
      ._get(`${this.url}/enum-list`)
      .pipe(
        tap((response: any) => {
          this._stateType.next(response?.response?.data?.typeConteneur);
        }),
        map((response: any) => response?.response?.data?.typeConteneur)
      );
  }

  /**
   * Get state booking
   */
  getStateBooking(): Observable<StateBooking> {
    // if(environment.production) {
    //   return new Observable<StateBooking>(obs => {
    //     obs.next(this.datas.statutBooking);
    //   });
    // }
    return this.api
      ._get(`${this.url}/enum-list`)
      .pipe(
        tap((response: any) => {
          this._stateBooking.next(response?.response?.data?.statutBooking);
        }),
        map((response: any) => response?.response?.data?.statutBooking)
      );
  }

  /**
   * Get state lots
   */
  getStateLots(): Observable<StateLots> {
    // if(environment.production) {
    //   return new Observable<StateLots>(obs => {
    //     obs.next(this.datas.statutLots);
    //   });
    // }
    return this.api
      ._get(`${this.url}/enum-list`)
      .pipe(
        tap((response: any) => {
          this._stateLots.next(response?.response?.data?.statutLots);
        }),
        map((response: any) => response?.response?.data?.statutLots)
      );
  }
}
