import { Component, OnInit } from "@angular/core";
import { User } from "./user.component.model";
import { HttpService } from "src/app/services/http.service";
import { URLConstants } from "src/app/constants/url-constants";
import { UserRole } from "./user.enum";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  constructor(private http: HttpService) {}
  public user: User = <User>{};
  public component: String = "User";
  public url = new URLConstants();
  public userList: Array<User> = [];
  private roleTypes = UserRole;
  public roleTypeOptions = [];
  ngOnInit() {
    this.getAll();
    this.roleTypeOptions = Object.keys(this.roleTypes);
  }

  public create(f:NgForm) {
    if (f.valid) {
      this.http.post(this.user, this.url.UserCreate).subscribe(
        res => {
          this.successHandler(this.component);
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
    this.http.delete(this.url.UserDelete + id).subscribe(
      res => {
        this.successHandler(this.component);
      },
      err => {
        this.errorHandler(this.component);
      }
    );
  }
  public update() {
    this.http.post(this.user, this.url.UserUpdate).subscribe(
      res => {
        this.successHandler(this.component);
      },
      err => {
        this.errorHandler(this.component);
      }
    );
  }
  public getAll() {
    this.http.get(this.url.UserGetAll).subscribe(
      res => {
        this.userList = res as Array<User>;
      },
      err => {
        this.errorHandler(this.component);
      }
    );
  }
  public getById(id: number) {
    this.http.get(this.url.UserGetById + id).subscribe(
      res => {
        this.user = res as User;
        this.successHandler(this.component);
      },
      err => {
        this.errorHandler(this.component);
      }
    );
  }
  private successHandler(type: String) {
    alert("SuccessFully " + type + " Created");
  }
  private errorHandler(type: String) {
    alert("Error in " + type);
  }
}