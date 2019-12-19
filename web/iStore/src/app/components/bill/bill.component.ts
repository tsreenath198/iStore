import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http.service";
import { ProductModel } from "../product/product.component.model";

import { BillModel } from "./bill.component.model";
import { URLConstants } from "src/app/constants/url-constants";

@Component({
  selector: "app-bill",
  templateUrl: "./bill.component.html",
  styleUrls: ["./bill.component.css"]
})
export class BillComponent implements OnInit {
  public productList: Array<ProductModel> = [];
  public itemList: Array<BillModel> = [];
  public selectedItem: BillModel = <BillModel>{};
  public totalBill: number = 0.0;
  public url = new URLConstants();
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.getProducts();
  }
  public getProducts() {
    this.http.get(this.url.ProductGetAll).subscribe(resp => {
      this.productList = resp as any;
    });
  }

  public addToList(p: any) {
    this.totalBill = 0;
    let index = this.itemList.findIndex(i => i.productId === p.id);
    if (index == -1) {
      this.itemList.push(this.addToModel(p));
    } else {
      this.itemList[index].quantity += 1;
      this.itemList[index].total = this.calculateTotal(this.itemList[index]);
    }
    this.itemList.forEach(i => (this.totalBill += i.total));
  }
  private addToModel(p: any): BillModel {
    let bill: BillModel = <BillModel>{};
    bill.productId = p.id;
    bill.price = p.price;
    bill.discount = 5;
    bill.quantity = 1;
    bill.total = this.calculateTotal(bill);
    return bill;
  }
  private calculateTotal(p: any) {
    return (p.quantity * p.price * (100 - p.discount)) / 100;
  }
  public setTotal(p: any) {
    p.total = (p.quantity * p.price * (100 - p.discount)) / 100;
  }
}
