import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExchangeService {
  observer = new BehaviorSubject<any>({ token: '', type: '', data: {} });

  public subscriber$ = this.observer.asObservable();

  emitData(data: any) {
    this.observer.next(data);
  }
}
