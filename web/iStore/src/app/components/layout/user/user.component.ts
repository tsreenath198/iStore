import { Component, OnInit } from "@angular/core";
import { User } from "./user.component.model";
import { HttpService } from "src/app/services/http.service";
import { URLConstants } from "src/app/constants/url-constants";
import { UserRole } from "./user.enum";
import { NgForm } from '@angular/forms';
import { GlobalConstants } from "src/app/constants/global-contants";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor(private userService: HttpService) { }
  public user: User = <User>{};
  public url = new URLConstants();
  public contants = new GlobalConstants();
  public userList: Array<User> = [];
  public actionLabel: string = "Create";
  public roleTypes = UserRole;
  public roleTypeOptions = [];
  ngOnInit() {
    this.getAll();
    this.roleTypeOptions = Object.keys(this.roleTypes);
  }

  public create(f: NgForm) {
    if (f.valid) {
      if(this.actionLabel == this.contants.CREATE){
        this.userService.post(this.user, this.url.UserCreate).subscribe(
          res => {
            this.successHandler(this.contants.CREATED_MESSAGE);
            f.reset();
            this.actionLabel = this.contants.CREATE;
          },
          err => {
            this.errorHandler(this.contants.ERROR_CREATED_MESSAGE);
          }
        );
      }else{
        this.userService.put(this.user, this.url.UserUpdate).subscribe(
          res => {
            this.successHandler(this.contants.UPDATED_MESSAGE);
            f.reset();
            this.actionLabel = this.contants.CREATE;
          },
          err => {
            this.errorHandler(this.contants.ERROR_UPDATED_MESSAGE);
          }
        );
      }
      
    } else {
      this.userService.errorToastr(this.contants.REQUIRED_FIELDS,this.contants.USER);
    }
  }
  public deleteById(id: number) {
    this.userService.delete(this.url.UserDelete + id).subscribe(
      res => {
        this.successHandler(this.contants.DELETED_MESSAGE);
      },
      err => {
        this.errorHandler(this.contants.ERROR_DELETED_MESSAGE);
      }
    );
  }
  public getAll() {
    this.userService.get(this.url.UserGetAll).subscribe(
      res => {
        this.userList = res as Array<User>;
        this.userService.successToastr(this.contants.FETCHED_MESSAGE,this.contants.USER)
      },
      err => {
        this.errorHandler(this.contants.ERROR_FETCHED_MESSAGE);
      }
    );
  }
  public getById(id: number) {
    this.actionLabel = this.contants.UPDATE;
    this.userService.get(this.url.UserGetById + id).subscribe(
      res => {
        this.user = res as User;
      },
      err => {
        this.errorHandler(this.contants.ERROR_FETCHED_MESSAGE);
      }
    );
  }
  public reset(){
    this.user = new User();
    this.actionLabel = this.contants.CREATE;
  }
  private successHandler(message: string) {
    this.userService.successToastr(message,this.contants.USER);
    this.getAll();
  }
  private errorHandler(message: string) {
    this.userService.successToastr(message,this.contants.USER);
  }
}
