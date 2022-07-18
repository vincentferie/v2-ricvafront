import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations';

@Component({
  selector: 'app-dechargements',
  templateUrl: './dechargements.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DechargementsComponent {
  /**
   * Constructor
   */
  constructor() {}
}
