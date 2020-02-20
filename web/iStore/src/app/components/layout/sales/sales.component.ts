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
  public totalTable: any = [{ date: "2020-01-20" }];
  public chooseDays:any=['Day','Week' , 'Month' , "Year" ];
  public selectedDay:string = 'Day';
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.getTotalData();
  }

  // private getAllSales() {
  //   this.http.get(this.URL.SalesTotal + this.selectedDay).subscribe(resp => {
  //     this.salesList = resp as any;
  //   });
  // }
  private getTotalData(){
    let noOfDays = 0;
    let currentDate:any = new Date();
    switch(this.selectedDay){
      case 'Day':
        noOfDays =1;
        break;
      case 'Week':
        noOfDays = currentDate.getDay()+1;
        break;
      case 'Month':
        noOfDays= currentDate.getDate();
        break;
      case 'Year':
        let startDate:any = new Date(currentDate.getFullYear(), 0, 0);
        let diff = currentDate - startDate;
        let oneDay = 1000 * 60 * 60 * 24;
        noOfDays = Math.floor(diff / oneDay);
        break;
    }
    this.http.get(this.URL.SalesTotal+ noOfDays).subscribe(resp =>{
      this.salesList = resp as any;
    })
  }
}
