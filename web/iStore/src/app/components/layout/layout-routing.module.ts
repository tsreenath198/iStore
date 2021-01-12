import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { UserComponent } from "./user/user.component";
import { CustomerComponent } from "./customer/customer.component";
import { RoleGuard } from "src/app/guards/role.guard";
import { UserRole } from "./user/user.enum";
import { ExpenseComponent } from './expense/expense.component';
import { EditReportComponent } from "./report/edit-report/edit-report.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "bill", pathMatch: "prefix" },
      {
        path: "user",
        component: UserComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin]
        }
      },
      {
        path: "customer",
        component: CustomerComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin]
        }
      },
      {
        path: "expense",
        component: ExpenseComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin,UserRole.Store_Manager]
        }
      },
      {
        path: "product",
        loadChildren: "./product/product.module#ProductModule",
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.Store_Manager]
        }
      },
      {
        path: "bill",
        loadChildren: "./item/item.module#ItemModule",
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Associate, UserRole.Admin, UserRole.Store_Manager]
        }
      },
      {
        path: "report",
        loadChildren: "./report/report.module#ReportModule",
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.Store_Manager]
        }
      },
      {
        path: "category",
        loadChildren: "./category/category.module#CategoryModule",
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin]
        }
      },
      {
        path: "sales",
        loadChildren: "./sales/sales.module#SalesModule",
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.Store_Manager]
        }
      },
      {
        path: "profit",
        loadChildren: "./profits/profits.module#ProfitsModule",
        canActivate: [RoleGuard],
        data: {
          roles: [UserRole.Admin, UserRole.Store_Manager]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
