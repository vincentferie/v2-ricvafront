import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-operation',
  templateUrl: './menu-operation.component.html',
})
export class MenuOperationComponent implements OnInit {
  @Input() interface: string = '';
  @Output() currentEvent = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.onMenu(this.interface)
  }

  onMenu(current: string) {
    this.interface = current;
    this.currentEvent.emit(this.interface)
    if(this.interface === 'CAMPAGNE') {
      this.router.navigate(['/administration/operations/campagne']);
    } else if(this.interface === 'CAMPAGNE-OUTTURN') {
      this.router.navigate(['/administration/operations/campagne/outturn']);
    } else if(this.interface === 'CAMPAGNE-TRANCHE') {
      this.router.navigate(['/administration/operations/campagne/tranche']);
    } else if(this.interface === 'ENTREPOT') {
      this.router.navigate(['/administration/operations/entrepot']);
    } else if(this.interface === 'ENTREPOT-ASSIGNE') {
      this.router.navigate(['/administration/operations/entrepot/assigne']);
    } else if(this.interface === 'EXPORTATEUR') {
      this.router.navigate(['/administration/operations/exportateur']);
    } else if(this.interface === 'VILLE') {
      this.router.navigate(['/administration/operations/ville']);
    } else if(this.interface === 'SITE') {
      this.router.navigate(['/administration/operations/site']);
    } else if(this.interface === 'SITE-ASSIGNE') {
      this.router.navigate(['/administration/operations/site/assigne']);
    }
    return this.interface;
  }

  public current() {
  }
}
