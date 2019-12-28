import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ProductModel } from "../product/product.component.model";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { ItemModel, OrderModel } from "./item.component.model";
import { URLConstants } from "src/app/constants/url-constants";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"]
})
export class ItemComponent implements OnInit {
  public productList: Array<ProductModel> = [];
  public itemList: Array<ItemModel> = [];
  public selectedItem: ItemModel = <ItemModel>{};
  public totalBill: number = 0.0;
  public printingBill: any = {};
  public url = new URLConstants();

  public closeResult = "";
  private modalRef: NgbModalRef;
  constructor(private http: HttpService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getProducts();
  }
  public getProducts() {
    this.http.get(this.url.ProductGetAll).subscribe(resp => {
      this.productList = resp as any;
    });
  }

  public addToList(p: any) {
    let index = this.itemList.findIndex(i => i.productId === p.id);
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
  private addToModel(p: any): ItemModel {
    let bill: ItemModel = <ItemModel>{};
    bill.productId = p.id;
    bill.price = p.price;
    bill.discount = 25;
    bill.quantity = 1;
    bill.total = this.calculateSingleItemTotal(bill);
    return bill;
  }
  private calculateSingleItemTotal(p: any) {
    return (p.quantity * p.price * (100 - p.discount)) / 100;
  }
  private calculateOrderTotal(p: any) {
    this.totalBill = 0;
    p.forEach(i => (this.totalBill += i.total));
  }
  public setTotal(p: any) {
    p.total = (p.quantity * p.price * (100 - p.discount)) / 100;
    this.calculateOrderTotal(this.itemList);
  }
  public generateBill() {
    let finalOrder: OrderModel = <OrderModel>{};
    finalOrder.total = this.totalBill;
    finalOrder.items = this.itemList;
    this.http.post(finalOrder, this.url.OrderCreate).subscribe(resp => {
      this.itemList = [];
      this.totalBill = 0.0;
    });
  }
  public cancelBill() {
    this.itemList = [];
    this.totalBill = 0.0;
  }
  /**Printing bill model */
  public setPrintingBill(billContent) {
    this.printingBill["items"] = this.itemList;
    this.printingBill["total"] = Math.ceil(this.totalBill);
    this.printingBill["date"] = new Date();
    this.printingBill.items.forEach(item => {
      this.productList.forEach(product => {
        if (item.productId == product.id) {
          item["productName"] = product.name;
        }
      });
    });
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
}
