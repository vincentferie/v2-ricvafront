import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FinanceComponent } from './finance.component';
import { SharedModule } from 'projects/ricva-cajou/src/app/shared/shared.module';
import { financeRoutes } from './finance.routing';

@NgModule({
  declarations: [FinanceComponent],
  imports: [
    RouterModule.forChild(financeRoutes),
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    NgApexchartsModule,
    SharedModule,
  ],
})
export class FinanceModule {}
