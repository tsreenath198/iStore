import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ItemModel } from "../item/item.component.model";
import { URLConstants } from "src/app/constants/url-constants";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

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
  public chooseDays:any=['Day','Week' , 'Month' , "Year" ];
  public selectedDay:string = 'Day';
  public grandTotal: number = 0;
  private modalRef: NgbModalRef;
  public closeResult = "";
  constructor(public router: Router,private http: HttpService, private modalService: NgbModal, private storageService: StorageService) {}

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
    this.http.get(this.URL.OrderTotalByDays+ noOfDays).subscribe(resp =>{
      this.totalTable = resp as any;
      this.calculateTotal(this.totalTable);
    })
    
    
  }

  private calculateTotal(data){
    this.grandTotal = 0;
    data.forEach(element => {
      this.grandTotal += element.total;
    });
    console.log(this.grandTotal)
  }

  public delete(order: any,date) {
    if (window.confirm("Do you want to delete " + order.contact.name+ "'s bill?")) {
      this.http.delete(this.URL.OrderDelete + order.id).subscribe(resp => {
        this.getTotalData();
        this.getAllReports()
        this.filterData(date);
      });
    }
  }

  public edit(order:any){
    this.storageService.orderId = order.id;
    this.router.navigate(['/bill'])
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