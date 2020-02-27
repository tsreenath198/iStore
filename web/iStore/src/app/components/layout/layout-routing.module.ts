import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "bill", pathMatch: "prefix" },
      {
        path: "product",
        loadChildren: "./product/product.module#ProductModule"
      },
      {
        path: "bill",
        loadChildren: "./item/item.module#ItemModule"
      },
      {
        path: "report",
        loadChildren: "./report/report.module#ReportModule"
      },
      {
        path: "category",
        loadChildren: "./category/category.module#CategoryModule"
      },
      {
        path: "sales",
        loadChildren: "./sales/sales.module#SalesModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}