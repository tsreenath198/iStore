import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: "", redirectTo: "bill", pathMatch: "prefix" },
  //{ path: '', loadChildren: './layout/layout.module#LayoutModule' },
  { path: "bill", loadChildren: ".components/bill/bill.module#BillModule" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
