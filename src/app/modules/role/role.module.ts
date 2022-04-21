import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './components/role/role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleService } from './services/role.service';
import { SearchRolePipe } from './pipes/search-role.pipe';


@NgModule({
  declarations: [
    RoleComponent,
    RoleFormComponent,
    SearchRolePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoleRoutingModule,
    SharedModule,
  ],
  providers: [
    RoleService,
  ]
})
export class RoleModule { }
