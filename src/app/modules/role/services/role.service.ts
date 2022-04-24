import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url: string;

  constructor(
    private _httpClient: HttpClient,
  ) { 
    this.url = environment.api;
  }

  public getAll(): Observable<any> {
    const url = `${this.url}/role`;
    return this._httpClient.get(url);
  }

  public getRole(roleId: number): Observable<any> {
    const url = `${this.url}/role/${roleId}`;
    return this._httpClient.get(url);
  }

  public saveRole(data: any): Observable<any> {
    const url = `${this.url}/role/store`;
    return this._httpClient.post(url, data);
  }

  public updateRole(data: any): Observable<any> {
    const url = `${this.url}/role/update`;
    return this._httpClient.put(url, data);
  }

  public deleteRole(roleId: number): Observable<any> {
    const url = `${this.url}/role/delete/${roleId}`;
    return this._httpClient.delete(url);
  }
}
