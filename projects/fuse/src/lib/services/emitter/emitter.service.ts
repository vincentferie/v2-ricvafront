import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  event = new EventEmitter();

  public isAllowToLoad = true;

  constructor() {
  }

  emit(data: any): void {
    this.event.emit(data);
  }

  kebabize(str: any): string {
    return str.split('').map((letter: any, idx: any) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    }).join('');
  }

  on(event: any, callback: any): void {
    this.event.subscribe((data) => {
      if (data.action === event) {
        callback(data);
      }
    });
  }

  loading(text?: string, showLogo?: boolean): void {
    if (this.isAllowToLoad) {
      this.emit({action: 'LOADING_START', payload: {text, showLogo}});
    }
  }

  disallowLoading(): void {
    this.isAllowToLoad = false;
    this.emit({action: 'DISALLOW_LOADING'});
  }

  allowLoading(): void {
    this.isAllowToLoad = true;
  }

  stopLoading(): void {
    this.emit({action: 'LOADING_STOP', payload: 'STOP'});
    this.allowLoading();
  }

  camelize(str: any): string {
    const arr = str.split('_');
    const capital = arr.map((item: any, index: any) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase());
    return capital.join('');
  }
}
