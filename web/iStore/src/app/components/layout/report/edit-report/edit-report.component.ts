import { Component, Input, OnInit } from '@angular/core';
import { URLConstants } from 'src/app/constants/url-constants';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit {
  @Input() report:any;
  public url = new URLConstants();
  public paymentTypes: Array<any> = ["Cash", "Bank"];
  public orderTypes: Array<any> = ["Store", "Zomato", "Swiggy"];
  constructor(private http:HttpService) { }

  ngOnInit() {
    this.report.invoiceDate = new Date(this.report.invoiceDate).toISOString().substring(0, 10);
  }
  public update() {
    this.http.update(this.report, this.url.OrderUpdate).subscribe(resp => {
      window.alert("Updated successfully.");
      window.location.reload();
    });
  }

}
