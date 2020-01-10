import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ItemModel } from "../item/item.component.model";
import { URLConstants } from "src/app/constants/url-constants";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

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
  public totalTable: any = [];
  public chooseDays:any={Day:1 , Week:7 , Month:31 , Year:365};
  public selectedDay:number = 7;
  private modalRef: NgbModalRef;
  public closeResult = "";
  constructor(private http: HttpService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getAllReports();
    this.getTotalData();
  }

  private getAllReports() {
    this.http.get(this.URL.OrderGetAll).subscribe(resp => {
      this.orderList = resp as any;
    });
    
  }
  getTotalData(){
    this.http.get(this.URL.OrderTotalByDays+ this.selectedDay).subscribe(resp =>{
      this.totalTable = resp as any;
    })
  }

  public delete(order: any,date) {
    if (window.confirm("Do you want to delete " + order.name + "?")) {
      this.http.delete(this.URL.OrderDelete + order.id).subscribe(resp => {
        this.getAllReports();
        this.filterData(date);
      });
    }
  }

  private openPopup(order, billContent) {
    this.popupContent = order;
    this.open(billContent);
  }
  /**
   * @param
   * 1) content consists the modal instance
   * 2) Selected contains the code of selected row
   */
  public open(content: any) {
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
  public getDate(orderDate):string{
    let temp = new Date(orderDate);
      let year:any = temp.getFullYear();
      let month:any = temp.getMonth() + 1;
      if(month<10){
        month ="0"+month;
      }
      let date:any = temp.getDate() ;
      if(date<10){
        date ="0"+date;
      }
      let formatedDate =
        year + "-" + month + "-" + date;
    return formatedDate
  }
  public filterData(cmpDate: any) {
    this.cardTable = [];
    this.orderList.filter(order => {
      let orderDate = this.getDate(order.createdDate);
      if (orderDate == cmpDate) {
        this.cardTable.push(order);
      }
    });
  }
}
