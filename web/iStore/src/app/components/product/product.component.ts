import { Component, OnInit } from "@angular/core";
import { ProductModel } from "./product.component.model";
import { HttpService } from "src/app/services/http.service";
import { URLConstants } from "src/app/constants/url-constants";
import { NgForm } from "@angular/forms";
import { CategoryModel } from "../category/category.component.model";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  public productList: Array<ProductModel> = [];
  public filterProductList: Array<any> = [];
  public categoryList: Array<CategoryModel> = [];
  public selectedCategory: string = "All";
  public model: any = <any>{};
  public url = new URLConstants();
  public actionType: string = "C";
  
  
  public sortType     = 'name'; // set the default sort type
  public sortReverse = false;
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.getResult();
    this.getResult2();
  }
  async getResult(): Promise<any> {
    this.productList = await this.http
      .get(this.url.ProductGetAll)
      .toPromise()
      .then(resp => resp as any); //Do you own cast here
    this.filterProductList = this.productList;

    if(this.selectedCategory != 'All') this.setFilter();
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
    this.filter(item[0].id, item[0].name);
  }
  public commonInHTTP() {
    this.getResult();
    this.getResult2();
    this.model = <ProductModel>{};
  }

  public create(form: NgForm) {
    this.http.post(this.model, this.url.ProductCreate).subscribe(resp => {
      this.commonInHTTP();
      //form.resetForm();
    });
  }

  public update() {
    this.http.update(this.model, this.url.ProductUpdate).subscribe(resp => {
      this.commonInHTTP();
      this.actionType = "C";
    });
  }

  public new(form: NgForm) {
    this.model = {};
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
  // public handleFileInput(Event: any) {
  //   let selectedFile = Event.target.files[0];
  //   let formData = new FormData();
  //   formData.append("file", selectedFile);
  //   this.model.image = formData;
  // }

  /**Filter */
  public filter(categoryId, categoryName) {
    if (categoryName == "All") {
      this.getResult();
      this.selectedCategory = categoryName;
    } 
    else if(categoryName == 'Check Inventory'){
      this.selectedCategory = categoryName;
      let temp = [];
      this.filterProductList.filter(product => {
        if (product.inventory < product.minimumAvailability) {
          temp.push(product);
        }
      });
      this.productList = temp;
    }
    else {
      this.selectedCategory = categoryName;
      let temp = [];
      this.filterProductList.filter(product => {
        if (categoryId == product.category.id) {
          temp.push(product);
        }
      });
      this.productList = temp;
    }
  }
  showEndingInventories(value){
    if(value){
      this.filter(0,'Check Inventory')
    }
    else{
      this.filter(0,'All');
    }
  }
  public compareFn(user1: ProductModel, user2: ProductModel) {
    return user1 && user2 ? user1.id === user2.id : user1 === user2;
}
}
