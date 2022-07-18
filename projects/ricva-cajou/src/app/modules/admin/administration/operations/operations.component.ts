import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss'],
})
export class OperationsComponent implements OnInit {
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Administration', range: 'last' },
  ];
  interface: string = 'CAMPAGNE';

  constructor() {}

  ngOnInit(): void {}
}
