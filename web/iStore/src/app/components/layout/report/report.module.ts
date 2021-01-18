import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { EditReportDialogComponent } from './edit-report-dialog/edit-report-dialog.component';


@NgModule({
  declarations: [ReportComponent, EditReportDialogComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    NgxPrintModule
  ],
  exports:[EditReportDialogComponent]
})
export class ReportModule { }
