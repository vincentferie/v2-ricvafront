import { fuseAnimations } from '@kolab/fuse/src/lib/animations';
import { ViewEncapsulation, ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'fuse-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
})
export class FuseBreadcrumbComponent {
  @Input() paths: any[] = [];

  /**
   * Constructor
   */
  constructor() {}

}
