import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
;
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item.component';
import { ItemRoutingModule } from './item-routing.module';
import { NgxPrintModule } from 'ngx-print';
import { ComboBoxComponent } from '../common/combo-box/combo-box.component';


@NgModule({
  declarations: [ItemComponent,ComboBoxComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    NgxPrintModule,
    FormsModule
  ]
})
export class ItemModule { }
