import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "./category.component.model";
import { URLConstants } from "src/app/constants/url-constants";
import { HttpService } from "src/app/services/http.service";
import { NgForm } from "@angular/forms";
import { GlobalConstants } from "src/app/constants/global-contants";

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
  public statusOptions = [{ name: 'Active', value: 0 }, { name: 'Inactive', value: 1 }];
  public rawMatOpt = [{ name: 'Raw Material', value: true }, { name: 'Non Raw Material', value: false }];
  constructor(private categoryService: HttpService) { }

  ngOnInit() {
    this.getAll();
    this.model.activeStatus = 0;
    this.model.rawMaterial = false;
  }
  private getAll() {
    this.categoryService.get(this.url.CategoryGetAll).subscribe(resp => {
      this.categoryList = resp as any;
      this.categoryService.successToastr(GlobalConstants.FETCHED_MESSAGE,GlobalConstants.CATEGORY);
    },err=>{
      this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE);
    });
  }

  

  public create(form: NgForm) {
    this.categoryService
      .post(this.model,
        this.url.CategoryCreate
      )
      .subscribe(resp => {
        this.successHandler(GlobalConstants.CREATED_MESSAGE);
        this.model.activeStatus = 0;
        this.model.rawMaterial = false;
      },err=>{
        this.errorHandler(GlobalConstants.ERROR_CREATED_MESSAGE)
      });
  }

  public update() {
    this.categoryService.update(this.model, this.url.CategoryUpdate).subscribe(resp => {
      this.successHandler(GlobalConstants.UPDATED_MESSAGE);
      this.actionType = "C";
    },err=>{
      this.errorHandler(GlobalConstants.ERROR_UPDATED_MESSAGE)
    });
  }

  public new(form: NgForm) {
    this.model = <CategoryModel>{};

    this.model.activeStatus = 0;
    this.model.rawMaterial = false;
    this.actionType = "C";
  }

  public getById(id: number) {
    this.categoryService.get(this.url.CategoryGetById + id).subscribe(resp => {
      this.model = resp as any;
      this.actionType = "U";
    },err=>{
        this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE)
      });
  }
  public delete(category: any) {
    if (window.confirm("Do you want to delete " + category.name + "?")) {
      this.categoryService.delete(this.url.CategoryDelete + category.id).subscribe(resp => {
        this.successHandler(GlobalConstants.DELETED_MESSAGE);
      },err=>{
        this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE);
      });
    }
  }
  private successHandler(message: string) {
    this.categoryService.successToastr(message,GlobalConstants.CATEGORY);
    this.getAll();
    this.model = <CategoryModel>{};
    this.model.activeStatus = 0;
    this.model.rawMaterial = false;
  }
  private errorHandler(message: string) {
    this.categoryService.errorToastr(message,GlobalConstants.CATEGORY);
  }
}
