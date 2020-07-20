import { Component, OnInit } from "@angular/core";
import {
  ProductModel
} from "./product.component.model";
import { HttpService } from "src/app/services/http.service";
import { URLConstants } from "src/app/constants/url-constants";
import { NgForm } from "@angular/forms";
import { CategoryModel } from "../category/category.component.model";
import {
  NgbModal,
  NgbModalRef,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";
import { ExcelServicesService } from "src/app/services/excel-services.service";
import { StorageService } from "src/app/services/storage.service";
import { User } from "../user/user.component.model";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  public productList: Array<ProductModel> = [];
  public filterProductList: Array<any> = [];
  public categoryList: Array<CategoryModel> = [];
  public orderProductsList: any = {};
  public selectedCategory: string = "All";
  public showMinStock: boolean = false;
  public isRaw: boolean = true;
  public num: string = "";
  public statusOptions = [
    { name: "Active", value: 0 },
    { name: "Inactive", value: 1 }
  ];
  public model: ProductModel = <ProductModel>{};
  public updateInventoryModel: any = [];
  public url = new URLConstants();
  public actionType: string = "C";

  public sortType = "name"; // set the default sort type
  public sortReverse = false;
  public closeResult = "";
  private modalRef: NgbModalRef;
  public loggedInUser: User;
  public component: string = "Product"
  constructor(
    private http: HttpService,
    private storage: StorageService,
    private modalService: NgbModal,
    private excelService: ExcelServicesService
  ) {
    this.loggedInUser = storage.getLoggedInUserName();
  }

  ngOnInit() {
    this.getResult();
    this.getResult2();
    this.model.activeStatus = 0;
  }
  async getResult(): Promise<any> {
    this.productList = await this.http
      .get(this.url.ProductGetAll)
      .toPromise()
      .then(resp => resp as any); //Do you own cast here
    this.filterProductList = this.productList;

    if (this.selectedCategory != "All") this.setFilter();
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
    const item = this.categoryList.filter(
      item => item.name == this.selectedCategory
    );
    this.filter(item[0].name);
  }
  public commonInHTTP() {
    this.getResult();
    this.getResult2();
    this.model = <ProductModel>{};
    this.model.activeStatus = 0;
  }

  public create(f: NgForm) {
    if (!this.model.category.rawMaterial) {
      this.model.inventory = 0;
      this.model.minimumAvailability = 0;
    }

    if (f.valid) {
      this.http.post(this.model, this.url.ProductCreate).subscribe(
        res => {
          this.successHandler(this.component);
        },
        err => {
          this.errorHandler(this.component);
        }
      );
    } else {
      alert("Please enter all required fields");
    }
  }

  private successHandler(type: String) {
    this.commonInHTTP();
    alert("SuccessFully " + type + " Created");
  }
  private errorHandler(type: String) {
    alert("Error in " + type);
  }

  public update() {
    this.http.update(this.model, this.url.ProductUpdate).subscribe(resp => {
      this.commonInHTTP();
      this.actionType = "C";
    });
  }

  public new(form: NgForm) {
    this.model = <ProductModel>{};
    this.model.activeStatus = 0;
    this.actionType = "C";
  }

  public getById(id: number) {
    this.http.get(this.url.ProductGetById + id).subscribe(resp => {
      this.model = resp as any;
      this.actionType = "U";
    });
  }
  public delete(product: any) {
    if (window.confirm("Do you want to delete " + product.name + "?")) {
      this.http.delete(this.url.ProductDelete + product.id).subscribe(resp => {
        this.getResult();
      });
    }
  }

  /**Filter */
  public filter(categoryName) {
    this.selectedCategory = categoryName;
    if (categoryName == "All") {
      if (!this.showMinStock) {
        this.getResult();
      } else {
        let temp = [];
        this.filterProductList.filter(product => {
          if (
            this.selectedCategory == "All" &&
            product.inventory < product.minimumAvailability
          ) {
            temp.push(product);
          }
        });
        this.productList = temp;
      }
    } else {
      let temp = [];
      this.selectedCategory = categoryName;
      this.productList = [];
      if (this.showMinStock) {
        this.filterProductList.filter(product => {
          if (
            product.inventory < product.minimumAvailability &&
            product.category.name == this.selectedCategory
          ) {
            if (
              product.category.rawMaterial ||
              this.selectedCategory == "All"
            ) {
              this.isRaw = true;
            } else {
              this.isRaw = false;
            }
            temp.push(product);
          }
        });
        this.productList = temp;
      } else {
        this.updateInventoryModel = [];
        this.filterProductList.filter(product => {
          if (categoryName == product.category.name) {
            if (product.category.rawMaterial) {
              this.isRaw = true;
            } else {
              this.isRaw = false;
            }
            this.productList.push(product);
          }
        });
      }
    }
  }
  showEndingInventories(value) {
    this.filter(this.selectedCategory);
  }
  public compareFn(user1: ProductModel, user2: ProductModel) {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
  }

  public SetUpdateableInventory(event: any) {
    this.updateInventoryModel = JSON.parse(JSON.stringify(this.productList));
    this.updateInventoryModel.forEach(product => {
      product.inventory = 0;
    });

    console.log(this.updateInventoryModel);
    this.open(event);
  }
  public orderInventory(event: any) {
    this.orderProductsList = [];
    // this.categoryList.filter(cat => {
    //   if (cat.rawMaterial) {
    //     let order: OrderModel = <OrderModel>{};
    //     order.products = [];
    //     order.categoryName = cat.name;
    //     this.filterProductList.filter(product => {
    //       if (cat.id == product.category.id) {
    //         let temp: ProductsOrderModel = <ProductsOrderModel>{};
    //         temp.productName = product.name;
    //         temp.inventory = product.inventory;
    //         temp.minAvailability = product.minimumAvailability;
    //         if (product.inventory < product.minimumAvailability) {
    //           temp.orderCount = product.minimumAvailability - product.inventory;
    //         } else {
    //           temp.orderCount = 0;
    //         }
    //         order.products.push(temp);
    //       }
    //     });
    //     this.orderProductsList.push(order);
    //   }
    // });
    this.http.get(this.url.ProductGetInventory).subscribe(resp => {
      this.orderProductsList = resp as any;
      let temp = Object.keys(this.orderProductsList);
      console.log(this.orderProductsList);
      if (temp) this.num = temp[temp.length - 1];
    });
    this.open(event);
  }
  public setIndexOfList(i) {
    this.num = i;
  }
  public updateInventory() {
    this.http
      .post(this.updateInventoryModel, this.url.ProductInventoryUpdate)
      .subscribe(resp => {
        this.close();
        this.getResult();
        window.alert("Inventory updated successfully");
      });
  }
  public getExcel() {
    let excel = [];

    this.orderProductsList.forEach(item => {
      item.products.forEach(product => {
        let temp = {
          "Category/Product": "",
          Inventory: 0,
          "Minimum Availability": 0,
          OrderCount: 0
        };
        temp["Category/Product"] =
          item.categoryName + "/" + product.productName;
        temp["Inventory"] = product.inventory;
        temp["Minimum Availability"] = product.minAvailability;
        temp.OrderCount = product.orderCount;
        excel.push(temp);
      });
    });
    this.excelService.exportAsExcelFile(excel, "Order Details"); //,["Category/Product","Inventory","Minimum Availability","OrderCount"]
    console.log(this.orderProductsList);
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
  public downloadInventoryExcel() {
    // let orderModel: any = [];
    // for (var p in this.orderProductsList) {
    //   if (this.orderProductsList.hasOwnProperty(p)) {
    //     this.orderProductsList[p].forEach(item => {
    //       orderModel.push(item);
    //     });
    //   }
    // }
    console.log(this.orderProductsList);
    this.http.update(this.orderProductsList, this.url.GetRawInventory).subscribe(
      resp => { },
      err => {
        if (err.status == 200) window.open(err.url);
      }
    );
  }
}
