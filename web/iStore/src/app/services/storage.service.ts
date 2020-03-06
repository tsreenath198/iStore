import { Injectable } from "@angular/core";
import { User } from "../components/layout/user/user.component.model";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor() {}
  public orderId: number;
  user: User;
  getLoggedInUserName(): User {
    if (localStorage.getItem("loggedInUser") != "null") {
      this.user = JSON.parse(localStorage.getItem("loggedInUser"));
      return this.user;
    }
  }
}
