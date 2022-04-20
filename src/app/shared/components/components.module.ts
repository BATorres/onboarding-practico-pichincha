import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    ModalComponent,
    FormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalComponent,
  ]
})
export class ComponentsModule { }
