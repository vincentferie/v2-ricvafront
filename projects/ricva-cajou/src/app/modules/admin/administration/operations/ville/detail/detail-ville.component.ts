import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { VilleService } from '../ville.service';
import { Ville } from '../ville.types';

@Component({
  selector: 'app-detail-ville',
  templateUrl: './detail-ville.component.html',
  styleUrls: ['./detail-ville.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class DetailVilleComponent implements OnInit {
  ville: Ville;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des villes', range: null },
    { label: 'Détails d\'une ville', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _VilleService: VilleService
  ) {
    this.ville = this._VilleService.getVille();
    if(!this.ville) {
      this.toBack();
      return;
    }
  }

  /**
   * On init
   */
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  toBack(): void {
    this.router.navigate(['/administration/operations/ville/list']);
  }
}
