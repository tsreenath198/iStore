import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitsRoutingModule } from './profits-routing.module';
import { ProfitsComponent } from './profits.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfitsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProfitsRoutingModule
  ]
})
export class ProfitsModule { }
