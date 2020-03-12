import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { CustomerModel } from './customer.component.model';
import { URLConstants } from 'src/app/constants/url-constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private http: HttpService) {}
  public customer: CustomerModel = <CustomerModel>{};
  public component: String = "Customer";
  public url = new URLConstants();
  public customersList: Array<CustomerModel> = [];
  public actionLabel:string = "Create";
  ngOnInit() {
    this.getAll();
  }

  public create(f:NgForm) {
    if (f.valid) {
      this.http.post(this.customer, this.url.CustomerCreate).subscribe(
        res => {
          this.successHandler(this.component);
          f.reset();
          this.actionLabel = 'Create';
        },
        err => {
          this.errorHandler(this.component);
        }
      );
    }else{
      alert("Please enter all required fields");
    }
  }
  public deleteById(id: number) {
    this.http.delete(this.url.CustomerDelete + id).subscribe(
      res => {
        this.successHandler(this.component);
      },
      err => {
        this.errorHandler(this.component);
      }
    );
  }
  public getAll() {
    this.http.get(this.url.CustomerGetAll).subscribe(
      res => {
        this.customersList = res as Array<CustomerModel>;
      },
      err => {
        this.errorHandler(this.component);
      }
    );
  }
  public getById(id: number) {
    this.actionLabel = 'Update';
    this.http.get(this.url.CustomerGetById + id).subscribe(
      res => {
        this.customer = res as CustomerModel;
      },
      err => {
        this.errorHandler(this.component);
      }
    );
  }
  private successHandler(type: String) {
    this.getAll();
    console.log("SuccessFully " + type + " Created");
  }
  private errorHandler(type: String) {
    alert("Error in " + type);
  }

}
