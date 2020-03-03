import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";
import { URLConstants } from "src/app/constants/url-constants";
import { User } from "../layout/user/user.component.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginPin: any = null;
  public username: string = "";
  public password: string = "";
  public url: URLConstants = new URLConstants();
  public user: User = <User>{};
  constructor(private route: Router, private http: HttpService) {}

  ngOnInit() {
    localStorage.setItem("loggedInUser", null); //  when user sign out default to null 
  }
  signIn() {
    if (
      this.username &&
      this.username.length > 3 &&
      this.password &&
      this.password.length > 3
    ) {
      this.http
        .post({}, this.url.login + this.username + "&password=" + this.password)
        .subscribe(
          res => {
            this.user = res as User;
            this.successHandler(this.user);
          },
          err => {
            this.errorHandler();
          }
        );
    } else {
      window.alert("Please provide username & password");
    }
  }
  successHandler(result: User) {
    this.user = result;
    localStorage.setItem("loggedInUser", JSON.stringify(this.user));
    this.route.navigate(["/layout"]);
  }
  errorHandler() {
    window.alert("Invalid Username and password");
  }
}
