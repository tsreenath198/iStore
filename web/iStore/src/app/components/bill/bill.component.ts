import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ProductModel } from '../product/product.component.model';

import { BillModel } from './bill.component.model';
import { URLConstants } from 'src/app/constants/url-constants';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  public productList: Array<ProductModel>=[];
  public billList: Array<BillModel> = [];
  public url = new URLConstants();
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.billList.push({id:0, productId: 0 ,discount:0, quantity:0 , price: 0 , total:0, description:" "})
    this.getProducts();
  }
  public getProducts(){
    this.http.get(this.url.ProductGetAll).subscribe(resp=>{
      this.productList = resp as any;
    })
  }

  public addProductDetailsToBill(productId){
    let itemToBill: BillModel=<BillModel>{};
    this.productList.filter(pl =>{
      console.log(pl)
      if(pl.id == productId){
        itemToBill.productId = pl.id;
        itemToBill.price = pl.price;
        itemToBill.total = pl.price;
        itemToBill.quantity = 1;
      }
    })

    this.billList.push(itemToBill);
  }
}
