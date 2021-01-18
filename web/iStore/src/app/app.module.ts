import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { NgxPrintModule } from "ngx-print";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { ReportModule } from "./components/layout/report/report.module";
import { EditReportDialogComponent } from "./components/layout/report/edit-report-dialog/edit-report-dialog.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPrintModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ReportModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[EditReportDialogComponent]
})
export class AppModule {}
