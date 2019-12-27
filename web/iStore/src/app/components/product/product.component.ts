import { Component, OnInit } from "@angular/core";
import { ProductModel } from "./product.component.model";
import { HttpService } from "src/app/services/http.service";
import { URLConstants } from "src/app/constants/url-constants";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  public productList: Array<ProductModel> = [];
  public model: ProductModel = <ProductModel>{};
  public url = new URLConstants();
  public actionType: string = "C";
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.getAll();
  }
  private getAll() {
    this.http.get(this.url.ProductGetAll).subscribe(resp => {
      this.productList = resp as any;
    });
  }

  public commonInHTTP() {
    this.getAll();
    this.model = <ProductModel>{};
  }

  public create(form: NgForm) {
    this.http
      .postImage(
        this.url.ProductCreate +
          "?inventory=" +
          this.model.inventory +
          "&name=" +
          this.model.name +
          "&price=" +
          this.model.price,
        this.model.image
      )
      .subscribe(resp => {
        this.commonInHTTP();
        form.resetForm();
        console.log("Product created");
      });
  }

  public update() {
    this.http.update(this.model, this.url.ProductUpdate).subscribe(resp => {
      this.commonInHTTP();
      this.actionType = "C";
    });
  }

  public new(form: NgForm) {
    form.resetForm();
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
        this.getAll();
      });
    }
  }
  public handleFileInput(Event: any) {
    let selectedFile = Event.target.files[0];
    let formData = new FormData();
    formData.append("file", selectedFile);
    this.model.image = formData;
  }
}
