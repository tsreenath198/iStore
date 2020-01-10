import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "item", pathMatch: "prefix" },
  { path: "product", loadChildren: "./components/product/product.module#ProductModule" },
  { path: "item", loadChildren: "./components/item/item.module#ItemModule" },
  { path:"report", loadChildren: "./components/report/report.module#ReportModule"},
  { path:"category", loadChildren: "./components/category/category.module#CategoryModule"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
