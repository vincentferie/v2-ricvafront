import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { fuseAnimations } from '@kolab/fuse/src/public-api';

@Component({
  selector: 'app-plan-empotage',
  templateUrl: './plan-empotage.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanEmpotageComponent {
  /**
   * Constructor
   */
  constructor() {}
}
