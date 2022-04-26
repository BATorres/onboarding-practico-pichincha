import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './layout/full-layout.component';
import { SimpleLayoutComponent } from './layout/simple-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'rol',
        loadChildren: () => import('./modules/role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'usuario',
        loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'usuario',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
