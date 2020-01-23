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
  public totalBill: number = 0.0;
  public printingBill: any = {};
  public url = new URLConstants();

  public closeResult = "";
  private modalRef: NgbModalRef;
  constructor(
    private http: HttpService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getResult2();
    this.getResult();
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
    if (p.category.defaultDiscount) {
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
    finalOrder.total = this.totalBill;
    finalOrder.items = this.itemList;
    finalOrder.contact = this.customerDetails;
    finalOrder.paymentMode = this.paymentMode;
    this.http.post(finalOrder, this.url.OrderCreate).subscribe(resp => {
      // this.printingBill=resp as any;
      // this.setPrintingBill(event);
      this.cancelBill();
      this.close();
    });
  }
  /**Printing bill model */
  public setPrintingBill(billContent) {
    if (!this.customerDetails.name) {
      //this.toastr.error("Order", "Name cannot be empty");
      window.alert("Name cannot be empty");
    } else if (!this.paymentMode) {
      window.alert("Please select payment mode");
      //this.toastr.error("Order", "Please select payment mode");
    } else {
      this.http.get(this.url.OrderGetId).subscribe(resp => {
        this.printingBill["id"] = resp as any;
      });
      this.printingBill["items"] = this.itemList;
      this.printingBill["total"] = Math.ceil(this.totalBill);
      this.printingBill["contact"] = this.customerDetails;
      this.printingBill["paymentMode"] = this.paymentMode;
      this.printingBill["date"] = new Date();

      this.open(billContent);
    }
  }
  public cancelBill() {
    this.itemList = [];
    this.totalBill = 0.0;
    this.paymentMode = undefined;
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
}
