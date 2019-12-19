import { Component, OnInit } from "@angular/core";
import { ProductModel } from "./product.component.model";
import { HttpService } from "src/app/services/http.service";
import { URLConstants } from "src/app/constants/url-constants";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  public productList: Array<ProductModel>=[]
  public model: ProductModel = <ProductModel>{}
  public url = new URLConstants();
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.getAll();
  }
  private getAll() {
    this.http.get(this.url.ProductGetAll).subscribe(resp => {
      this.productList = resp as any;
    });
    console.log(this.productList);
  }

  public create(){
    this.http.post(this.model,this.url.ProductCreate).subscribe(resp =>{
      this.getAll();
      this.model = <ProductModel>{}
      console.log("Product created");
    })
  }
}
