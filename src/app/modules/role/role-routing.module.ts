import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleComponent } from './components/role/role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
  },
  {
    path: 'nuevo',
    component: RoleFormComponent,
  },
  {
    path: 'editar/:id',
    component: RoleFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
