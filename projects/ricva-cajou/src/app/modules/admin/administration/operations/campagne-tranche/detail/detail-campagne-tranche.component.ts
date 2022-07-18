import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { CampagneTrancheService } from '../campagne-tranche.service';
import { CampagneTranche } from '../campagne-tranche.types';

@Component({
  selector: 'app-detail-campagne-tranche',
  templateUrl: './detail-campagne-tranche.component.html',
  styleUrls: ['./detail-campagne-tranche.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class DetailCampagneTrancheComponent implements OnInit {
  campagne: CampagneTranche;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des campagnes tranche', range: null },
    { label: 'Détails d\'un campagne tranche', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _CampagneService: CampagneTrancheService
  ) {
    this.campagne = this._CampagneService.getCampagne();
    if(!this.campagne) {
      this.toBack();
      return;
    }
  }

  ngOnInit(): void {
  }

  toBack(): void {
    this.router.navigate(['/administration/operations/campagne/tranche/list']);
  }
}
