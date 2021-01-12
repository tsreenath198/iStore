import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { NgxPrintModule } from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { EditReportComponent } from './edit-report/edit-report.component';


@NgModule({
  declarations: [ReportComponent, EditReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    NgxPrintModule
  ],
  exports:[EditReportComponent]
})
export class ReportModule { }
