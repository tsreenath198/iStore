import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
