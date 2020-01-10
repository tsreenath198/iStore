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
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.getAll();
  }
  private getAll() {
    this.http.get(this.url.CategoryGetAll).subscribe(resp => {
      this.categoryList = resp as any;
    });
  }

  public commonInHTTP() {
    this.getAll();
    this.model = <CategoryModel>{};
  }

  public create(form: NgForm) {
    this.http
    .post(this.model,
      this.url.CategoryCreate
    )
    .subscribe(resp => {
      this.commonInHTTP();
      form.resetForm();
      console.log("Product created");
    });
  }

  public update() {
    this.http.update(this.model, this.url.CategoryUpdate).subscribe(resp => {
      this.commonInHTTP();
      this.actionType = "C";
    });
  }

  public new(form: NgForm) {
    form.resetForm();
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
