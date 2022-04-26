import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagmentRoutingModule } from './managment-routing.module';
import { ManagmentComponent } from './components/managment/managment.component';


@NgModule({
  declarations: [
    ManagmentComponent
  ],
  imports: [
    CommonModule,
    ManagmentRoutingModule
  ]
})
export class ManagmentModule { }
