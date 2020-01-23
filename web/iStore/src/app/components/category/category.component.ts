import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "./category.component.model";
import { URLConstants } from "src/app/constants/url-constants";
import { HttpService } from "src/app/services/http.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  public categoryList: Array<CategoryModel> = [];
  public model: CategoryModel = <CategoryModel>{};
  public url = new URLConstants();
  public actionType: string = "C";
  public statusOptions=[{name: 'Active', value: 0},{name: 'Inactive', value: 1}];
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.getAll();
    this.model.activeStatus = 0;
  }
  private getAll() {
    this.http.get(this.url.CategoryGetAll).subscribe(resp => {
      this.categoryList = resp as any;
    });
  }

  public commonInHTTP() {
    this.getAll();
    this.model = <CategoryModel>{};
    
    this.model.activeStatus = 0;
  }

  public create(form: NgForm) {
    this.http
    .post(this.model,
      this.url.CategoryCreate
    )
    .subscribe(resp => {
      this.commonInHTTP();
      this.model.activeStatus = 0;
    });
  }

  public update() {
    this.http.update(this.model, this.url.CategoryUpdate).subscribe(resp => {
      this.commonInHTTP();
      this.actionType = "C";
    });
  }

  public new(form: NgForm) {
    this.model = <CategoryModel>{};
    
    this.model.activeStatus = 0;
    this.actionType = "C";
  }

  public getById(id: number) {
    this.http.get(this.url.CategoryGetById + id).subscribe(resp => {
      this.model = resp as any;
      this.actionType = "U";
    });
  }
  public delete(product: any) {
    if (window.confirm("Do you want to delete " + product.name + "?")) {
      this.http.delete(this.url.ProductDelete + product.id).subscribe(resp => {
        this.getAll();
      });
    }
  }
}
