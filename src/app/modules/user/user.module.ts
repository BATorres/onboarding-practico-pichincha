import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserService } from './services/user.service';
import { RoleService } from '../role/services/role.service';
import { SearchUserPipe } from './pipes/search-user.pipe';


@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent,
    SearchUserPipe,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    RoleService,
    UserService,
  ]
})
export class UserModule { }
