import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from './layout/full-layout.component';
import { SimpleLayoutComponent } from './layout/simple-layout.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: 'inicio',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rol',
    component: FullLayoutComponent,
    data: { roles: ['Administrador'] },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'usuario',
        data: { roles: ['Administrador', 'Gerente'] },
        loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'usuario',
    component: FullLayoutComponent,
    data: { roles: ['Administrador', 'Gerente'] },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
