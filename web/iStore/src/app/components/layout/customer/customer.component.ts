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
  public customersList: Array<CustomerModel> = [];
  public actionLabel: string = "Create";
  ngOnInit() {
    this.getAll();
  }

  public create(f: NgForm) {
    if (f.valid) {
      if (this.actionLabel === GlobalConstants.CREATE) {
        this.customerService.post(this.customer, this.url.CustomerCreate).subscribe(
          res => {
            this.successHandler(GlobalConstants.CREATED_MESSAGE);
            f.reset();
            this.actionLabel = GlobalConstants.CREATE;
          },
          err => {
            this.errorHandler(GlobalConstants.ERROR_CREATED_MESSAGE);
          }
        );
      }else{
        this.customerService.update(this.customer, this.url.CustomerUpdate).subscribe(
          res => {
            this.successHandler(GlobalConstants.UPDATED_MESSAGE);
            f.reset();
            this.actionLabel = GlobalConstants.CREATE;
          },
          err => {
            this.errorHandler(GlobalConstants.ERROR_UPDATED_MESSAGE);
          }
        );
      }
    } else {
      this.customerService.errorToastr(GlobalConstants.REQUIRED_FIELDS,GlobalConstants.CUSTOMER);
    }
  }
  public deleteById(id: number) {
    this.customerService.delete(this.url.CustomerDelete + id).subscribe(
      res => {
        this.successHandler(GlobalConstants.DELETED_MESSAGE);
      },
      err => {
        this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE);
      }
    );
  }
  public getAll() {
    this.customerService.get(this.url.CustomerGetAll).subscribe(
      res => {
        this.customersList = res as Array<CustomerModel>;
        this.customerService.successToastr(GlobalConstants.FETCHED_MESSAGE,GlobalConstants.CUSTOMER);
      },
      err => {
        this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE);
      }
    );
  }
  public getById(id: number) {
    this.actionLabel = GlobalConstants.UPDATE;
    this.customerService.get(this.url.CustomerGetById + id).subscribe(
      res => {
        this.customer = res as CustomerModel;
      },
      err => {
        this.errorHandler(GlobalConstants.ERROR_DELETED_MESSAGE);
      }
    );
  }
  private successHandler(message: string) {
    this.getAll();
   this.customerService.successToastr(message,GlobalConstants.CUSTOMER);
  }
  private errorHandler(message: string) {
   this.customerService.errorToastr(message,GlobalConstants.CUSTOMER);
  }

}
