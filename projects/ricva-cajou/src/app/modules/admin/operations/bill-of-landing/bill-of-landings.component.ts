import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations';

@Component({
  selector: 'app-bill-of-landings',
  templateUrl: './bill-of-landings.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillOfLandingsComponent {
  constructor() {}

  ngOnInit(): void {}
}
