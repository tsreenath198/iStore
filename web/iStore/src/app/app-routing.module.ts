import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "product", pathMatch: "prefix" },
  { path: "product", loadChildren: "./components/product/product.module#ProductModule" },
  { path: "item", loadChildren: "./components/item/item.module#ItemModule" },
  { path:"report", loadChildren: "./components/report/report.module#ReportModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }