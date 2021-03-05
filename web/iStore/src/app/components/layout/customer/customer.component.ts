import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { CustomerModel } from './customer.component.model';
import { URLConstants } from 'src/app/constants/url-constants';
import { NgForm } from '@angular/forms';
import { GlobalConstants } from 'src/app/constants/global-contants';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private customerService: HttpService) { }
  public customer: CustomerModel = <CustomerModel>{};
  public url = new URLConstants();
  public constants = new GlobalConstants();
  public customersList: Array<CustomerModel> = [];
  public actionLabel: string = "Create";
  ngOnInit() {
    this.getAll();
  }

  public create(f: NgForm) {
    if (f.valid) {
      if (this.actionLabel === this.constants.CREATE) {
        this.customerService.post(this.customer, this.url.CustomerCreate).subscribe(
          res => {
            this.successHandler(this.constants.CREATED_MESSAGE);
            f.reset();
            this.actionLabel = this.constants.CREATE;
          },
          err => {
            this.errorHandler(this.constants.ERROR_CREATED_MESSAGE);
          }
        );
      }else{
        this.customerService.update(this.customer, this.url.CustomerUpdate).subscribe(
          res => {
            this.successHandler(this.constants.UPDATED_MESSAGE);
            f.reset();
            this.actionLabel = this.constants.CREATE;
          },
          err => {
            this.errorHandler(this.constants.ERROR_UPDATED_MESSAGE);
          }
        );
      }
    } else {
      this.customerService.errorToastr(this.constants.REQUIRED_FIELDS,this.constants.CUSTOMER);
    }
  }
  public deleteById(id: number) {
    this.customerService.delete(this.url.CustomerDelete + id).subscribe(
      res => {
        this.successHandler(this.constants.DELETED_MESSAGE);
      },
      err => {
        this.errorHandler(this.constants.ERROR_DELETED_MESSAGE);
      }
    );
  }
  public getAll() {
    this.customerService.get(this.url.CustomerGetAll).subscribe(
      res => {
        this.customersList = res as Array<CustomerModel>;
        this.customerService.successToastr(this.constants.FETCHED_MESSAGE,this.constants.CUSTOMER);
      },
      err => {
        this.errorHandler(this.constants.ERROR_FETCHED_MESSAGE);
      }
    );
  }
  public getById(id: number) {
    this.actionLabel = this.constants.UPDATE;
    this.customerService.get(this.url.CustomerGetById + id).subscribe(
      res => {
        this.customer = res as CustomerModel;
      },
      err => {
        this.errorHandler(this.constants.ERROR_FETCHED_MESSAGE);
      }
    );
  }
  private successHandler(message: string) {
    this.getAll();
   this.customerService.successToastr(message,this.constants.CUSTOMER);
  }
  private errorHandler(message: string) {
   this.customerService.errorToastr(message,this.constants.CUSTOMER);
  }

}
