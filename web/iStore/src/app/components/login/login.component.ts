import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public loginPin: any = null;
  constructor(private route: Router) {}

  ngOnInit() {
    
  }
  signIn() {
    if (this.loginPin == "12345") {
      this.route.navigate(["/layout"]);
    }
    else{
      window.alert("Invalid Pin")
    }
  }
}
