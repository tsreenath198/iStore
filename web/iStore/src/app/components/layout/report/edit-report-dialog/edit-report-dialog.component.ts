import { Component, Input, OnInit } from '@angular/core';
import { URLConstants } from 'src/app/constants/url-constants';
import { HttpService } from '../../../../services/http.service';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report-dialog.component.html',
  styleUrls: ['./edit-report-dialog.component.css']
})
export class EditReportDialogComponent implements OnInit {
  @Input() report:any;
  public url = new URLConstants();
  public customerList: Array<any> = [];
  public paymentTypes: Array<any> = ["Cash", "Bank"];
  public orderTypes: Array<any> = ["Store", "Zomato", "Swiggy"];
  constructor(private http:HttpService) { }

  ngOnInit() {
    this.report.invoiceDate = new Date(this.report.invoiceDate).toISOString().substring(0, 10);
    this.getCustomerList();
  }
  async getCustomerList(): Promise<any> {
    this.customerList = await this.http
      .get(this.url.CustomerGetAll)
      .toPromise()
      .then(resp => resp as any); //Do you own cast here
    return this.customerList;
  }
  public update() {
    this.http.update(this.report, this.url.OrderUpdate).subscribe(resp => {
      window.alert("Updated successfully.");
      window.location.reload();
    });
  }

  public customerChange() {
    this.customerList.forEach((data) => {
      if (data.name == this.report.contact.name) {
        this.report.contact.phone = data.phone;
      }
    })
  }

}
