import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url: string;
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

  constructor(
    private _httpClient: HttpClient,
  ) { 
    this.url = environment.api;
  }

  public getAll(): Observable<any> {
    // return of(this.roles);
    const url = `${this.url}/role`;
    return this._httpClient.get(url);
  }

  public getRole(roleId: number): Observable<any> {
    /* const roleIndex: number = this.roles.findIndex((user) => {
      return user?.id === +roleId;
    });

    return of(this.roles[roleIndex]); */
    const url = `${this.url}/role/${roleId}`;
    return this._httpClient.get(url);
  }

  public saveRole(data: any): Observable<any> {
    /* const lastRole = this.roles[this.roles.length - 1];
    data.id = lastRole?.id ? lastRole?.id + 1 : 1 ;

    this.roles.push(data);
    localStorage.setItem('roles', JSON.stringify(this.roles));

    return of(this.roles); */
    const url = `${this.url}/role/store`;
    return this._httpClient.post(url, data);
  }

  public updateRole(data: any): Observable<any> {
    /* const roleIndex: number = this.roles.findIndex((role) => {
      return role?.id === data.id;
    });

    this.roles[roleIndex] = data;
    localStorage.setItem('roles', JSON.stringify(this.roles));

    return of(this.roles); */
    const url = `${this.url}/role/update`;
    return this._httpClient.put(url, data);
  }

  public deleteRole(roleId: number): Observable<any> {
    /* const index = this.roles.findIndex((role) => role.id === roleId);
    this.roles.splice(index, 1);
    localStorage.setItem('roles', JSON.stringify(this.roles));

    return of(this.roles); */
    const url = `${this.url}/role/delete/${roleId}`;
    return this._httpClient.delete(url);
  }
}
