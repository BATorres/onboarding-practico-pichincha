import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './modules/role/role/role.component';
import { UserComponent } from './modules/user/user/user.component';

const routes: Routes = [
  {
    path: 'rol',
    component: RoleComponent,
  },
  {
    path: 'usuario',
    component: UserComponent,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
