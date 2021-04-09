import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/services/http.service";
import { URLConstants } from "src/app/constants/url-constants";
import { User } from "../layout/user/user.component.model";
import { GlobalConstants } from "src/app/constants/global-contants";

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
  constructor(private route: Router, private loginService: HttpService) { }

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
      this.loginService
        .post({}, this.url.Login + this.username + "&password=" + this.password)
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
  public keyPressLogin(event): void {
    if (event.keyCode === 13) this.signIn();
  }
  successHandler(result: User) {
    this.loginService.successToastr(GlobalConstants.LOGIN_MESSAGE, GlobalConstants.USER);
    this.user = result;
    localStorage.setItem("loggedInUser", JSON.stringify(this.user));
    this.route.navigate(["/layout"]);
  }
  errorHandler() {
    this.loginService.errorToastr(GlobalConstants.ERROR_LOGIN_MESSAGE, GlobalConstants.USER);
  }
}
