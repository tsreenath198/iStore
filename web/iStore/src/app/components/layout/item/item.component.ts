import { Component, OnInit, ViewChild} from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { ItemModel, OrderModel, ContactModel } from "./item.component.model";
import { URLConstants } from "src/app/constants/url-constants";
import { CategoryModel } from "../category/category.component.model";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"]
})
export class ItemComponent implements OnInit {
  @ViewChild("form", { read: NgForm, static: true }) form: any;
  public productList: Array<any> = [];
  public filterProductList: Array<any> = [];
  public itemList: Array<any> = [];
  public customerDetails: ContactModel = <ContactModel>{};
  public selectedItem: ItemModel = <ItemModel>{};
  public selectedCategory: string = "Cup";
  public categoryList: Array<CategoryModel> = [];
  public customerList: Array<any> = [];
  public paymentTypes: Array<any> = ["Cash", "Bank"];
  public orderTypes: Array<any> = ["Store", "Zomato", "Swiggy"];
  public paymentMode: string = 'Cash';
  public invoiceDate: string = new Date().toISOString().substring(0, 10);
  public orderType: string = 'Store';
  public totalDiscount: number = 0;
  public totalBill: number = 0.0;
  public printingBill: any = {};
  public url = new URLConstants();
  public giveAmount: any = 0;
  public closeResult = "";
  private modalRef: NgbModalRef;
  constructor(
    private http: HttpService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getCategoryList();
    this.getProductList();
    this.getCustomerList();
  }

  async getCustomerList(): Promise<any> {
    this.customerList = await this.http
      .get(this.url.CustomerGetAll)
      .toPromise()
      .then(resp => resp as any); //Do you own cast here
    return this.customerList;
  }
  async getProductList(): Promise<any> {
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
  async getCategoryList(): Promise<any> {
    this.categoryList = await this.http
      .get(this.url.CategoryGetAll)
      .toPromise()
      .then(resp => resp as any); //Do you own cast here
    return this.categoryList;
  }
  public setFilter() {
    this.selectedCategory = "Cup";
    const item = this.categoryList.filter(
      item => item.name.toLowerCase().trim() == this.selectedCategory.toLowerCase().trim()
    );
    if (item[0])
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
    if (p.defaultDiscount) {
      bill.discount = p.defaultDiscount;
    } else if (p.category.defaultDiscount) {
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
    if (this.totalDiscount > 0) {
      let temp = (this.totalBill * this.totalDiscount) / 100;
      this.totalBill -= Math.ceil(temp);
    }
  }
  public setTotal(p: any, type?: string) {
    this.totalDiscount = (type === 'discount') ? 0 : this.totalDiscount; // remove total discount when u give individual discount
    p.total = Math.ceil((p.quantity * p.price * (100 - p.discount)) / 100);
    this.calculateOrderTotal(this.itemList);
  }
  public generateBill(event) {
    let finalOrder: OrderModel = <OrderModel>{};
    finalOrder.total = this.printingBill.total;
    finalOrder.items = this.printingBill.items;
    if (Object.keys(this.printingBill.contact).length === 0) {
      finalOrder.contact = null;
    } else {
      finalOrder.contact = this.printingBill.contact;
    }
    finalOrder.paymentMode = this.printingBill.paymentMode;
    finalOrder.invoiceDate = this.printingBill.invoiceDate;
    finalOrder.totalDiscount = this.printingBill.totalDiscount;
    finalOrder.orderType = this.printingBill.orderType;
    this.http.post(finalOrder, this.url.OrderCreate).subscribe(resp => {
      alert("Successfully created");
      this.cancelBill();
      this.form.reset();
      this.close();
    });
  }

  public openPaymentOption(event) {
    this.open(event);
  }
  public proceedToPrint(event) {
    this.printingBill["paymentMode"] = this.paymentMode;
    this.printingBill["invoiceDate"] = this.invoiceDate;
    this.printingBill["orderType"] = this.orderType;
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
    this.invoiceDate = new Date().toISOString().substring(0, 10);
    this.orderType = 'Store';
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
    this.modalRef = this.modalService.open(content, { size: 'lg', backdrop: 'static' });
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
    this.giveAmount = 0;
    this.giveAmount = Math.floor(event.target.value - this.totalBill);
  }
  public calculateTotalDiscount() {
    if (this.totalDiscount > 0) {
      this.removeDiscountFromIndividual();
      this.calculateOrderTotal(this.itemList);
    } else if (this.totalDiscount == 0 || this.totalDiscount == null) {
      this.calculateOrderTotal(this.itemList);
    }
  }
  // Remove individual discount once total discount selected
  private removeDiscountFromIndividual() {
    this.itemList.map(item => {
      item.total = item.price * item.quantity;
      item.discount = 0;
    });
  }
  public onChange(details: any) {
    if(this.customerDetails.name){
      this.customerList.forEach((data) => {
        if (data.name == this.customerDetails.name) {
          this.customerDetails.phone = data.phone;
          this.customerDetails.count = data.count;
        }
      })
    }else{
      this.customerDetails.phone = '';
      this.customerDetails.count = 0;
    }   
  }
}
