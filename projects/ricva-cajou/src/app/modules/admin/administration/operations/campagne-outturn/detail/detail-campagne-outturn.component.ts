import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations/public-api';
import { CampagneOutturnService } from '../campagne-outturn.service';
import { CampagneOutturn } from '../campagne-outturn.types';

@Component({
  selector: 'app-detail-campagne-outturn',
  templateUrl: './detail-campagne-outturn.component.html',
  styleUrls: ['./detail-campagne-outturn.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class DetailCampagneOutturnComponent implements OnInit {
  campagne: CampagneOutturn;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: null },
    { label: 'Opérations', range: null },
    { label: 'Historique des campagnes outturn', range: null },
    { label: 'Détails d\'une campagne outturn', range: 'last' },
  ];

  constructor(
    private router: Router,
    private _CampagneService: CampagneOutturnService
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
    this.router.navigate(['/administration/operations/campagne/outturn/list']);
  }
}
