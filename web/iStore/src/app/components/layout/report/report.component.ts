import { Component, ComponentFactoryResolver, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ItemModel } from "../item/item.component.model";
import { URLConstants } from "src/app/constants/url-constants";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { EditReportDialogComponent } from "./edit-report-dialog/edit-report-dialog.component";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"]
})
export class ReportComponent implements OnInit {
  public orderList: Array<any> = [];
  public URL = new URLConstants();
  public popupContent: any = {};
  public cardTable: any = [];
  public groupByData: any = [];
  public valueByData: any = [];
  public finalBills: Array<any> = [];
  public valueByData2: any = [];
  public showTable: string = "";
  public chooseDays: any = ["Day", "Month", "Year"];
  public choosePrePopulateDays: any = ["Current week", "Current month", "Current year", "Manual"];
  public choosenDay: string = "Day";
  public getBillURLData = {};
  public months: Array<string> = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  public groupReq: any = {
    fromDate: "",
    groupBy: "",
    toDate: ""
  };
  private modalRef: NgbModalRef;
  public closeResult = "";
  constructor(
    public router: Router,
    private http: HttpService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.groupReq.groupBy = "Day";
    this.setCurrentDates();
    // let date = new Date();

    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();

    // if (month < 10) {
    //   month = 0 + month;
    // }
    // if (day < 10) day = 0 + day;

    // var today = year + "-" + month + "-" + day;

    this.getTotalData();
  }
  public setCurrentDates() {
    this.groupReq.fromDate = new Date().toISOString().substring(0, 10);
    this.groupReq.toDate = new Date().toISOString().substring(0, 10);
  }

  public getTotalData() {
    this.finalBills = [];
    this.http
      .get(
        this.URL.ReportByGroup +
        this.groupReq.fromDate +
        "&groupBy=" +
        this.groupReq.groupBy +
        "&toDate=" +
        this.groupReq.toDate
      )
      .subscribe(resp => {
        this.groupByData = resp as any;
      });
  }

  public valueBy1(data: any) {
    this.valueByData2 = [];
    this.finalBills = [];
    console.log(data);
    let reqUrl: string = "";
    if (data.type == "day") {
      this.getDateBills(data);
      this.showTable = "cardBody1";
    } else if (data.type == "month") {
      document.body.style.cursor = "progress";
      reqUrl =
        this.URL.ReportByValue +
        data.value +
        "&month=" +
        data.month +
        "&type=" +
        data.type +
        "&year=" +
        data.year +
        "&fromDate=" +
        this.groupReq.fromDate +
        "&toDate=" +
        this.groupReq.toDate;
      this.http.get(reqUrl).subscribe(resp => {
        this.valueByData2 = resp as any;
        document.body.style.cursor = "default";
      });
    }
  }
  public groupBy(data: any) {
    this.valueByData = [];
    this.valueByData2 = [];
    this.finalBills = [];
    console.log(data);
    if (data.type == "day") {
      this.getDateBills(data);
    } else {
      let reqUrl: string = "";
      reqUrl =
        this.URL.ReportByValue +
        data.value +
        "&month=" +
        data.month +
        "&type=" +
        data.type +
        "&year=" +
        data.year +
        "&fromDate=" +
        this.groupReq.fromDate +
        "&toDate=" +
        this.groupReq.toDate;
      this.http.get(reqUrl).subscribe(resp => {
        this.valueByData = resp as any;
      });
    }
  }

  public valueBy2(data: any) {
    this.showTable = "cardBody2";
    this.getDateBills(data);
  }

  public getDateBills(data: any): any {
    this.finalBills = [];
    this.getBillURLData = data;
    let reqUrl =
      this.URL.ReportGetBills +
      data.month +
      "&value=" +
      data.value +
      "&year=" +
      data.year;
    this.http.get(reqUrl).subscribe(resp => {
      this.finalBills = resp as any;
    });
  }

  public delete(order: any) {
    if (window.confirm("Do you want to delete the bill?")) {
      this.http.delete(this.URL.OrderDelete + order.id).subscribe(resp => {
        this.getDateBills(this.getBillURLData);
        //this.filterData(date);
        window.alert("Bill deleted successfully");
      });
    }
  }

  public edit(order: any) {
    this.modalRef = this.modalService.open(EditReportDialogComponent, { size: 'lg' });
    this.modalRef.componentInstance.report = order;
  }

  public openPopup(order, billContent) {
    this.popupContent = order;
    this.open(billContent);
  }
  /**
   * @param
   * 1) content consists the modal instance
   * 2) Selected contains the code of selected row
   */
  private open(content: any) {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  public close() {
    this.modalRef.close();
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  // public setToDate() {
  //   let temp = new Date(this.groupReq.fromDate);

  //   this.groupReq.toDate = temp;
  // }

  public setDates() {
    this.setCurrentDates();
    if (this.choosenDay == this.choosePrePopulateDays[0]) {
      //week
      var now = new Date();
      var firstDayOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay())
      );

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
      this.groupReq.fromDate = '';
      this.groupReq.toDate = '';
    }
  }
}
