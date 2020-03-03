import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./components/layout/user/user.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "prefix" },
  {
    path: "login",
    loadChildren: "./components/login/login.module#LoginModule"
  },
  {
    path: "layout",
    loadChildren: "./components/layout/layout.module#LayoutModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
