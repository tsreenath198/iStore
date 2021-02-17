import { Component, OnInit } from "@angular/core";
import { URLConstants } from "src/app/constants/url-constants";
import { HttpService } from "src/app/services/http.service";

@Component({
  selector: "app-sales",
  templateUrl: "./sales.component.html",
  styleUrls: ["./sales.component.css"]
})
export class SalesComponent implements OnInit {
  public salesCategoriesList: Array<any> = [];
  public salesProductsList: Array<any>=[];
  public URL = new URLConstants();
  public totalTable: any = [{ date: "2020-01-20" }];
  public choosePrePopulateDays: any = [
    "This week",
    "This month",
    "This year",
    "Custom"
  ];
  public choosenDay: string = "Custom";
  public groupReq: any = {
    fromDate: "",
    toDate: ""
  };
  constructor(private http: HttpService) {}

  ngOnInit() {
    //this.getTotalData();
    this.setCurrentDates();
  }
  public setCurrentDates() {
    this.groupReq.fromDate = new Date().toISOString().substring(0, 10);
    this.groupReq.toDate = new Date().toISOString().substring(0, 10);
  }

  public getTotalData() {
     this.http.get(this.URL.SalesGetCategories+ this.groupReq.fromDate +'&toDate='+this.groupReq.toDate).subscribe(resp =>{
       this.salesCategoriesList = resp as any;
     })
  }
  public getProductsData(catName) {
    this.http
      .get(
        this.URL.SalesGetProducts +
          catName +
          "&fromDate=" +
          this.groupReq.fromDate +
          "&toDate=" +
          this.groupReq.toDate
      )
      .subscribe(resp => {
        this.salesProductsList = resp as any;
      });
  }
  public setDates() {
    this.setCurrentDates();
    if (this.choosenDay == this.choosePrePopulateDays[0]) {
      //week
      var now = new Date();
      var firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

      this.groupReq.fromDate = firstDayOfWeek.toISOString().substring(0, 10);
    } else if (this.choosenDay == this.choosePrePopulateDays[1]) {
      //month
      //new Date(date.getFullYear(), date.getMonth(), 1)
      this.groupReq.fromDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        2
      )
        .toISOString()
        .substring(0, 10);
    } else if (this.choosenDay == this.choosePrePopulateDays[2]) {
      //year
      new Date().toISOString().substring(0, 10);
      this.groupReq.fromDate = new Date(new Date().getFullYear(), 0, 2)
        .toISOString()
        .substring(0, 10);
    } else {
      this.groupReq.fromDate = "";
      this.groupReq.toDate = "";
    }
  }
}
