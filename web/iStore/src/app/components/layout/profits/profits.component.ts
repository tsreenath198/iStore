import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { URLConstants } from 'src/app/constants/url-constants';

@Component({
  selector: 'app-profits',
  templateUrl: './profits.component.html',
  styleUrls: ['./profits.component.css']
})
export class ProfitsComponent implements OnInit {

  public profitsCategoriesList: Array<any> = [];
  public profitsProductsList: Array<any>=[];
  public URL = new URLConstants();
  public totalTable: any = [{ date: "2020-01-20" }];
  public choosePrePopulateDays: any = [
    "Current week",
    "Current month",
    "Current year",
    "Manual"
  ];
  public choosenDay: string = "Day";
  public selectedDay: string = "Day";
  public groupReq: any = {
    fromDate: "",
    toDate: ""
  };
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.setCurrentDates();
    this.getTotalData();
  }
  public setCurrentDates() {
    this.groupReq.fromDate = new Date().toISOString().substring(0, 10);
    this.groupReq.toDate = new Date().toISOString().substring(0, 10);
  }

  // private getAllSales() {
  //   this.http.get(this.URL.SalesTotal + this.selectedDay).subscribe(resp => {
  //     this.salesList = resp as any;
  //   });
  // }
  public getTotalData() {
    this.http.get(this.URL.ProfitGetCategory+ this.groupReq.fromDate +'&toDate='+this.groupReq.toDate).subscribe(resp =>{
      this.profitsCategoriesList = resp as any;
    })
  }
  public getProductsData(catName) {
    this.profitsProductsList=[];
    this.http
      .get(
        this.URL.ProfitGetProduct +
          catName +
          "&fromDate=" +
          this.groupReq.fromDate +
          "&toDate=" +
          this.groupReq.toDate
      )
      .subscribe(resp => {
        this.profitsProductsList = resp as any;
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
