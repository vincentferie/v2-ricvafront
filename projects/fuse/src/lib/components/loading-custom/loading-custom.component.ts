import {Component, OnInit} from '@angular/core';
import { EmitterService } from '../../services/emitter/emitter.service';

@Component({
  selector: 'app-loading-custom',
  templateUrl: './loading-custom.component.html',
  styleUrls: ['./loading-custom.component.scss']
})
export class FuseLoadingCustomComponent implements OnInit {
  disallowLoading: boolean = false;
  isLoading: boolean = false;
  text = 'Chargement en cours...';

  constructor(private emitter: EmitterService) {
    this.emitter.on('LOADING_START', (data: any) => {
      if (this.isLoading) {
        return;
      }
      if (this.disallowLoading) {
        this.disallowLoading = false;
        return;
      }
      this.isLoading = true;
      if (data.payload.hasOwnProperty('text')) {
        if (data.payload.text) {
          this.text = data.payload.text ? data.payload.text : 'Chargement en cours...';
        }
      }
    });
    this.emitter.on('DISALLOW_LOADING', () => {
      this.disallowLoading = true;
    });
    this.emitter.on('LOADING_STOP', (data: any) => {
      this.isLoading = false;
      this.text = 'Chargement en cours...';
    });
  }

  ngOnInit(): void {
  }

}
