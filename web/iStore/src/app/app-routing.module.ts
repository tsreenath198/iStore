import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "product", pathMatch: "prefix" },
  { path: "product", loadChildren: "./components/product/product.module#ProductModule" },
  { path: "bill", loadChildren: "./components/bill/bill.module#BillModule" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
