import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    FormsModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }
