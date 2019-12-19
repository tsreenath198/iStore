import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { BillComponent } from './bill.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BillComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    FormsModule
  ]
})
export class BillModule { }
