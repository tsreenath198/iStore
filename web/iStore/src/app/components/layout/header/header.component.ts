import { Component, OnInit } from "@angular/core";
import { User } from "../user/user.component.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor() {}
  ngOnInit() {}
  tabs = ["bill", "product", "category", "report", "sales", "expense","profit","user", "customer"];
  isAuthenticate(tab: string) {
    if (localStorage.getItem("loggedInUser") != "null") {
      this.user = JSON.parse(localStorage.getItem("loggedInUser"));
      this.user.rolesAllowed = this.user.rolesAllowed.map(function(x) {
        return x.toUpperCase();
      });
      if (
        this.user.rolesAllowed.indexOf(tab.toUpperCase()) > -1 ||
        this.user.rolesAllowed[0] == "All".toUpperCase()
      ) {
        return true;
      }
    }
    return false;
  }
}
