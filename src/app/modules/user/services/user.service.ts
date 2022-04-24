import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;

  constructor(
    private _httpClient: HttpClient,
  ) { 
    this.url = environment.api;
  }

  public getAll(): Observable<any> {
    const url = `${this.url}/user`;
    return this._httpClient.get(url);
  }

  public getUser(userId: number): Observable<any> {
    const url = `${this.url}/user/${userId}`;
    return this._httpClient.get(url);
  }

  public saveUser(data: any): Observable<any> {
    const url = `${this.url}/user/store`;
    return this._httpClient.post(url, data);
  }

  public updateUser(data: any): Observable<any> {
    const url = `${this.url}/user/update`;
    return this._httpClient.put(url, data);
  }

  public deleteUser(userId: number): Observable<any> {
    const url = `${this.url}/user/delete/${userId}`;
    return this._httpClient.delete(url);
  }

  public getSimilarEmail(userEmail: string): Observable<any> {
    const url = `${this.url}/user/email/${userEmail}`;
    return this._httpClient.get(url).pipe(delay(1000));
  }
}
