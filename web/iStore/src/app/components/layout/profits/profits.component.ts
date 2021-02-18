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
  public profitsProductsList: Array<any> = [];
  public URL = new URLConstants();
  public totalTable: any = [{ date: "2020-01-20" }];
  public choosePrePopulateDays: any = [
    "This week",
    "This month",
    "This year",
    "Custom"
  ];
  public choosenDay: string = "Custom";
  public selectedDay: string = "Custom";
  public grandTotal: number = 0;
  public groupReq: any = {
    fromDate: "",
    toDate: ""
  };
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.setCurrentDates();
    this.getTotalData();
  }
  public setCurrentDates() {
    this.groupReq.fromDate = new Date().toISOString().substring(0, 10);
    this.groupReq.toDate = new Date().toISOString().substring(0, 10);
  }

  async getTotalData(): Promise<any> {
    this.profitsCategoriesList = await this.http
      .get(this.URL.ProfitGetCategory + this.groupReq.fromDate + '&toDate=' + this.groupReq.toDate)
      .toPromise()
      .then(resp => resp as any); //Do you own cast here
      this.grandTotal = this.calculateGrandTotal();
    return this.profitsCategoriesList;
  }

  private getYesterdayDate(): Date {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.toDateString();
    return yesterday;
  }

  public getYesterdayRecords(): void {
    this.groupReq.fromDate = this.getYesterdayDate().toISOString().substring(0, 10);
    this.getTotalData();
  }
  public getProductsData(catName) {
    this.profitsProductsList = [];
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
  public calculateGrandTotal(): number {
    if (this.profitsCategoriesList.length) {
      return this.profitsCategoriesList.map(cat => cat.profit).reduce((accumulator, currentValue) => accumulator + currentValue);
    }
  }
}
