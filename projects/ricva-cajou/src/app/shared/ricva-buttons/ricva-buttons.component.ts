import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ricva-buttons',
  templateUrl: './ricva-buttons.component.html',
  styleUrls: ['./ricva-buttons.component.scss'],
})
export class RicvaButtonsComponent implements OnInit {
  constructor() {}

  applicationType = {
    cacao: 'cacao',
    cashew: 'cashew',
    rubber: 'rubber',
    karite: 'karite',
  };

  applicationName: string = this.applicationType.cashew;

  ngOnInit(): void {}

  toggleGreenButton(appName: string) {
    switch (appName) {
      case this.applicationType.cacao:
        this.applicationName = this.applicationType.cacao;
        break;
      case this.applicationType.cashew:
        this.applicationName = this.applicationType.cashew;
        break;
      case this.applicationType.rubber:
        this.applicationName = this.applicationType.rubber;
        break;
      case this.applicationType.karite:
        this.applicationName = this.applicationType.karite;
        break;
      default:
        this.applicationName = this.applicationType.cashew;
    }
  }
}
