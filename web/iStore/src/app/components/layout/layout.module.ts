import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule } from '@angular/forms';
import { ExpenseComponent } from './expense/expense.component';
import { InventoryComponent } from './inventory/inventory.component';
import { HistoryDialogComponent } from './inventory/history-dialog/history-dialog.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    UserComponent,
    CustomerComponent,
    ExpenseComponent,
    InventoryComponent,
    HistoryDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    LayoutRoutingModule
  ],
  exports: [
    HistoryDialogComponent
  ]
})
export class LayoutModule { }
