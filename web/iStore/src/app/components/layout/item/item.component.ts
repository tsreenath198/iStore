import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ProductModel } from "../product/product.component.model";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { ItemModel, OrderModel, ContactModel } from "./item.component.model";
import { URLConstants } from "src/app/constants/url-constants";
import { CategoryModel } from "../category/category.component.model";
import { ToastrService } from "ngx-toastr";
import { StorageService } from "src/app/services/storage.service";
import { chainedInstruction } from "@angular/compiler/src/render3/view/util";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"]
})
export class ItemComponent implements OnInit {
  public productList: Array<any> = [];
  public filterProductList: Array<any> = [];
  public itemList: Array<any> = [];
  public customerDetails: ContactModel = <ContactModel>{};
  public selectedItem: ItemModel = <ItemModel>{};
  public selectedCategory: string = "Cup";
  public categoryList: Array<CategoryModel> = [];
  public paymentTypes: Array<any> = ["Cash", "Bank"];
  public paymentMode: string;
  public updateMode: boolean = false;
  public totalDiscount: number = 0;
  public totalBill: number = 0.0;
  public printingBill: any = {};
  public url = new URLConstants();
  public giveAmount: any = 0;
  public closeResult = "";
  private modalRef: NgbModalRef;
  constructor(
    private storageService: StorageService,
    private http: HttpService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getResult2();
    this.getResult();
    if (this.storageService.orderId) {
      this.updateMode = true;
      this.http
        .get(this.url.OrderGetById + this.storageService.orderId)
        .subscribe(resp => {
          console.log(resp);
          let temp = resp as any;
          this.itemList = temp.items;
          this.totalBill = temp.total;
          this.customerDetails = temp.contact;
          this.paymentMode = temp.paymentMode;
        });
    }
  }
  async getResult(): Promise<any> {
    this.productList = await this.http
      .get(this.url.ProductGetAll)
      .toPromise()
      .then(resp => resp as any); //Do you own cast here
    this.filterProductList = this.productList;
    if (this.filterProductList) {
      this.setFilter();
    }
    return this.productList;
  }
  async getResult2(): Promise<any> {
    this.categoryList = await this.http
      .get(this.url.CategoryGetAll)
      .toPromise()
      .then(resp => resp as any); //Do you own cast here
    return this.categoryList;
  }
  public setFilter() {
    this.selectedCategory = "Cup";
    const item = this.categoryList.filter(
      item => item.name == this.selectedCategory
    );
    this.filter(item[0].id, item[0].name);
  }
  public addToList(p: any) {
    if (p.inventory <= 0) {
      window.alert("Item out of stock!");
    } else {
      let index = this.itemList.findIndex(i => i.product.id === p.id);
      if (index == -1) {
        this.itemList.push(this.addToModel(p));
      } else {
        this.itemList[index].quantity += 1;
        this.itemList[index].total = this.calculateSingleItemTotal(
          this.itemList[index]
        );
      }
      this.calculateOrderTotal(this.itemList);
    }
  }
  private addToModel(p: any): any {
    let bill: any = <any>{};
    bill.price = p.price;
    bill.product = p;
    if(p.defaultDiscount){
      bill.discount = p.defaultDiscount;
    }
    else if (p.category.defaultDiscount) {
      bill.discount = p.category.defaultDiscount;
    } else {
      bill.discount = 0;
    }
    bill.quantity = 1;
    bill.total = this.calculateSingleItemTotal(bill);
    return bill;
  }
  private calculateSingleItemTotal(p: any) {
    return (p.quantity * p.product.price * (100 - p.discount)) / 100;
  }
  private calculateOrderTotal(p: any) {
    this.totalBill = 0;
    p.forEach(i => (this.totalBill += i.total));
  }
  public setTotal(p: any) {
    p.total = (p.quantity * p.price * (100 - p.discount)) / 100;
    this.calculateOrderTotal(this.itemList);
  }
  public generateBill(event) {
    let finalOrder: OrderModel = <OrderModel>{};
    finalOrder.total = this.printingBill.total;
    finalOrder.items = this.printingBill.items;
    if(Object.keys(this.printingBill.contact).length === 0){
      finalOrder.contact = null;
    }
    else{
      finalOrder.contact = this.printingBill.contact;
    }
    finalOrder.paymentMode = this.printingBill.paymentMode;
    finalOrder.totalDiscount = this.printingBill.totalDiscount;
    this.http.post(finalOrder, this.url.OrderCreate).subscribe(resp => {
      this.cancelBill();
      this.close();
    });
  }

  public update() {
    let finalOrder: OrderModel = <OrderModel>{};
    finalOrder.id = this.storageService.orderId;
    finalOrder.total = Math.ceil(this.totalBill);
    finalOrder.items = this.itemList;
    finalOrder.contact = this.customerDetails;
    finalOrder.paymentMode = this.paymentMode;
    this.http.update(finalOrder, this.url.OrderUpdate).subscribe(resp => {
      // this.printingBill=resp as any;
      // this.setPrintingBill(event);
      window.alert("Updated successfully.");
      this.cancelBill();
      this.updateMode = false;
      this.storageService.orderId = null;
    });
  }

  public openPaymentOption(event) {
    this.open(event);
  }
  public proceedToPrint(event) {
    this.printingBill["paymentMode"] = this.paymentMode;
    this.close();
    this.open(event);
  }
  /**Printing bill model */
  public setPrintingBill(billContent) {
      this.http.get(this.url.OrderGetId).subscribe(resp => {
        this.printingBill["id"] = resp as any;
      });
      this.printingBill["items"] = this.itemList;
      this.printingBill["total"] = Math.ceil(this.totalBill);
      this.printingBill["contact"] = this.customerDetails;
      this.printingBill["date"] = new Date();
      this.printingBill["totalDiscount"] = this.totalDiscount;
      this.open(billContent);
  }
  public cancelBill() {
    this.itemList = [];
    this.totalBill = 0.0;
    this.paymentMode = undefined;
    if (this.updateMode) {
      this.updateMode = false;
    }
    this.customerDetails = <ContactModel>{};
  }

  /**Filter */
  public filter(categoryId, categoryName) {
    this.selectedCategory = categoryName;
    let temp = [];
    this.filterProductList.filter(product => {
      if (categoryId == product.category.id && product.activeStatus == 0) {
        temp.push(product);
      }
    });
    this.productList = temp;
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

  public removeItemFromBill(i) {
    this.itemList.splice(i, 1);
    this.calculateOrderTotal(this.itemList);
  }
  public alert() {
    window.alert("Name or Payment mode is empty.");
  }
  public calculateBill(event) {
    console.log(event);
    this.giveAmount = 0
      this.giveAmount = Math.floor(event.target.value - this.totalBill);
  }
  public calculateDiscount(event) {
    console.log(event)
    if (this.totalDiscount > 0 && ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
      let temp = (this.totalBill * this.totalDiscount) / 100;
      this.totalBill -= temp;
    } else if(this.totalDiscount == 0 || this.totalDiscount == null){
      this.calculateOrderTotal(this.itemList);
    }
  }
  
}
