import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
;
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item.component';
import { ItemRoutingModule } from './item-routing.module';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    NgxPrintModule,
    FormsModule
  ]
})
export class ItemModule { }
