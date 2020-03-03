import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { User } from "../components/layout/user/user.component.model";

@Injectable({
  providedIn: "root"
})
export class RoleGuard implements CanActivate {
  public user: User;
  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot) {
    debugger
    if (localStorage.getItem("loggedInUser") != "null") {
      this.user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (route.data.roles && route.data.roles.indexOf(this.user.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(["/login"]);
        return false;
      }
    }
    return true;
  }
}
