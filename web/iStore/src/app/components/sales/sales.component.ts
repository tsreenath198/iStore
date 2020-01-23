import { Component, OnInit } from "@angular/core";
import { URLConstants } from "src/app/constants/url-constants";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.css"]
})
export class SalesComponent implements OnInit {
  public salesList: Array<any> = [];
  public URL = new URLConstants();
  public popupContent: any = {};
  public todayDate: string = "";
  public cardTable: any = [];
  public totalTable: any = [{ date: "2020-01-20" }];
  public chooseDays: any = [
    { name: "Day", count: 1 },
    { name: "Week", count: 7 },
    { name: "Month", count: 31 },
    { name: "Year", count: 365 }
  ]; //{Day:1 , Week:7 , Month:31 , Year:365};
  public selectedDay: number = 1;
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.todayDate =
      new Date().getFullYear() +
      "-" +
      new Date().getMonth() +
      1 +
      "-" +
      new Date().getDate();
    this.getAllSales();
  }

  private getAllSales() {
    this.http.get(this.URL.SalesTotal + this.todayDate).subscribe(resp => {
      this.salesList = resp as any;
    });
  }
}
