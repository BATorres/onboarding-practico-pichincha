import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roles: Array<any> = JSON.parse(localStorage.getItem('roles')) || [
    {
      id: 1,
      name: 'Administrador',
    },
    {
      id: 2,
      name: 'Gerente',
    },
    {
      id: 3,
      name: 'Lider célula',
    },
  ];

  constructor() { }

  public getAll(): Observable<any> {
    return of(this.roles);
  }

  public saveRole(data: any): Observable<any> {
    const lastRole = this.roles[this.roles.length - 1];
    data.id = lastRole?.id ? lastRole?.id + 1 : 1 ;

    this.roles.push(data);
    localStorage.setItem('roles', JSON.stringify(this.roles));

    return of(this.roles);
  }

  public updateRole(data: any): Observable<any> {
    const roleIndex: number = this.roles.findIndex((role) => {
      return role?.id === data.id;
    });

    this.roles[roleIndex] = data;
    localStorage.setItem('roles', JSON.stringify(this.roles));

    return of(this.roles);
  }

  public deleteRole(roleId: number): Observable<any> {
    const index = this.roles.findIndex((role) => role.id === roleId);
    this.roles.splice(index, 1);
    localStorage.setItem('roles', JSON.stringify(this.roles));

    return of(this.roles);
  }
}
