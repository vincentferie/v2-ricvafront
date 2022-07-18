import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { fuseAnimations } from '@kolab/fuse/src/public-api';

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExecutionComponent {
  /**
   * Constructor
   */
  constructor() {}
}
