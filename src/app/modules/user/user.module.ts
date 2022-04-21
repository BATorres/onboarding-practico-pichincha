import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    UserService,
  ]
})
export class UserModule { }
