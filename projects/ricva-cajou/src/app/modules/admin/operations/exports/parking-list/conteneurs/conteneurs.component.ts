import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { fuseAnimations } from '@kolab/fuse/src/lib/animations';

@Component({
  selector: 'app-conteneurs',
  templateUrl: './conteneurs.component.html',
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConteneursComponent {
  constructor() {}

  ngOnInit(): void {}
}
