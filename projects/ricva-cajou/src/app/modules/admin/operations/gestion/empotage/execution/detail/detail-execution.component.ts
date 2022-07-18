import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '@ricva-cajou/src/app/core/communication/exchange-component.service';
import { Subject, takeUntil } from 'rxjs';
import { ExecutionService } from '../execution.service';

@Component({
  selector: 'app-detail-execution',
  templateUrl: './detail-execution.component.html',
  styleUrls: ['./detail-execution.component.scss']
})
export class DetailExecutionComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  myParam: any;
  execution: any;
  paths = [
    { label: 'Tableau de bord', range: 'first' },
    { label: 'Gestion des lots', range: null },
    { label: 'Empotage', range: null },
    { label: 'Execution', range: null },
    { label: 'Détail', range: 'last' },
  ];

  constructor(
    private _messageService: ExchangeService,
    private _ExecutionService: ExecutionService
  ) {}

  ngOnInit() {
    this._messageService.subscriber$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((message) => {
        // Update the pagination
        this.myParam = message;
        // Get the planEmpotage
        this._ExecutionService.executions$.subscribe(executions => {
          this.execution = executions.find((res: any) => {
            if(res?.id === this.myParam?.data) {
              return res;
            }
          });
        });
      });
  }

}
